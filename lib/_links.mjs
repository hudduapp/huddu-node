// follow links that's it!

import { Assets } from "./Assets.mjs";

export class Links {
  constructor({ data, includes } = {}) {
    this.data = data;
    this.includes = includes;

    this.followableFields = [
      "entry",
      "asset",
      "model",
      "locale",
      "environment",

      "organization",
      "project",
      "account",
    ];
  }

  run() {
    this.stageOne();
    this.stageTwo();
    this.stageThree();

    return this.data;
  }

  stageOne() {
    // stage 1 only replaces the first depth elements
    Object.keys(this.data).forEach((element) => {
      let dataType = element.slice(0, 1).toUpperCase() + element.slice(1);

      if (this.followableFields.includes(element)) {
        this.data[element] = this.includes[dataType].filter(
          (e) => (e.id = this.data[element])
        )[0];
      }
    });
  }

  stageTwo() {
    // stage 2 replaces entries for acutal entries in includes
    Object.keys(this.data.fields).forEach((element) => {
      if (Array.isArray(this.data.fields[element].entries)) {
        this.data.fields[element].entries.forEach((entryLink) => {
          entryLink.entry = this.includes["Entry"].filter(
            (e) => e.id == entryLink.entry
          )[0];
        });
      }
    });
  }

  stageThree() {
    // stage 3 fills out non-entry-entry assets
    Object.keys(this.data.fields).forEach((element) => {
      if (
        typeof this.data.fields[element] == "object" &&
        this.data.fields[element]
      ) {
        Object.keys(this.data.fields[element]).forEach((possibleAssetLink) => {
          if (this.data.fields[element][possibleAssetLink].asset) {
            this.data.fields[element][possibleAssetLink].asset = this.includes[
              "Asset"
            ].filter(
              (e) => e.id == this.data.fields[element][possibleAssetLink].asset
            )[0];
          }
        });
      }
    });
  }

  followLinks({ data, includes } = {}) {
    let fields = [
      "entry",
      "asset",
      "model",
      "locale",
      "environment",

      "organization",
      "project",
      "account",
    ];

    if (typeof data == "object") {
      Object.keys(data).forEach((element) => {
        if (
          fields.includes(element) &&
          !data.followed &&
          !data[element].followed
        ) {
          // JESUS!!!

          let dataType = element.slice(0, 1).toUpperCase() + element.slice(1);

          // tldr:set data[key of field in fields] equal to includes[data type].filter(filter for the id of data[key of field in fields] equal to the current elements id) and take the first element of the remaining list
          //check if datatype exists in includes is required; because this function might run over already followed links
          if (includes[dataType]) {
            console.log(data[element]);
            data[element] = includes[dataType].filter(
              (e) => (e.id = data[element])
            )[0];
            data[element].followed = true;
          }
        }
        //make it recursive
        if (Array.isArray(data[element])) {
          data[element].forEach((nestedElement) => {
            this.followLinks({
              data: data[element][data[element].indexOf(nestedElement)],
              includes: includes,
            });
          });
        } else if (typeof data[element] == "object" && data[element]) {
          this.followLinks({ data: data[element], includes: includes });
        }
      });
    }
  }
}
