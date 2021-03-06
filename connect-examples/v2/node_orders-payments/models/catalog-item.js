/*
Copyright 2019 Square Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 *  Catalog Item information for the page
 *
 * Description:
 *  Bundles together a CatalogItemObject and its associated catalogImageObject
 *  into a class.
 *
 *  Learn more about CatalogItem objects here:  https://developer.squareup.com/docs/api/connect/v2#type-catalogitem
 *  Learn more about CatalogImage objects here: https://developer.squareup.com/docs/api/connect/v2#type-catalogimage
 */
class CatalogItem {
  constructor(catalogItemObj, catalogImageObj) {
    this.catalogItemObj = catalogItemObj;
    this.catalogImageObj = catalogImageObj;
  }
  // Returns CatalogItemObject id, which is what is actually sold
  // If no variation exists it defaults to the CatalogItemObject id
  get defaultVariationId() {
    return this.defaultVariation.id;
  }
  // Return the catalog item object Id
  get itemObjectId() {
    return this.catalogItemObj.id;
  }
  // Returns  name of CatalogItemObject
  get name() {
    return this.catalogItemObj.item_data.name;
  }
  // Returns description of CatalogItemObject
  get description() {
    return this.catalogItemObj.item_data.description;
  }
  // Returns associated image url for CatalogObject
  get imageUrl() {
    return this.catalogImageObj && this.catalogImageObj.image_data && this.catalogImageObj.image_data.url;
  }
  // Returns price in dollars
  get price() {
    const {
      price_money
    } = this.defaultVariation.item_variation_data;
    return `${(price_money.amount/100).toFixed(2)}`;
  }
  // Returns the first variation in the variations array, our example we are selling one version of the item
  get defaultVariation() {
    // We don't have to check invalid item_data because we've filtered them out when initialize.
    return this.catalogItemObj.item_data.variations[0];
  }
}

module.exports = CatalogItem;
