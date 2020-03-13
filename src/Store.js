import { decorate, observable, action } from "mobx";
import { Presentation } from './models/Presentation';
import { init } from 'd2'

export class Store {
  engine;
  presentations = [];
  d2;
  baseUrl;
  apiVersion;
  currentPresentation = new Presentation();
  constructor(engine, baseUrl, apiVersion) {
    this.engine = engine;
    this.currentPresentation.setEngine(this.engine);
    this.baseUrl = baseUrl;
    this.apiVersion = apiVersion;
  }
  setPresentation = val => {
    this.currentPresentation = val;
    this.currentPresentation.setEngine(this.engine);
  }
  setD2 = async () => {
    this.d2 = await init({
      appUrl: this.baseUrl,
      baseUrl: `${this.baseUrl}/api/${this.apiVersion}`
    });
  };

  fetchPresentations = async () => {
    try {
      const val = await this.d2.dataStore.has('smart-slides');
      if (val) {
        const namespace = await this.d2.dataStore.get('smart-slides');
        const presentations = await namespace.get('presentations');
      } else {
        const namespace = await this.d2.dataStore.create('smart-slides');
        namespace.set('presentations', this.presentations);
      }
    } catch (e) {
      console.log(e);
    }
  };

}

decorate(Store, {
  presentations: observable,
  engine: observable,
  currentPresentation: observable,
  d2: observable,
  setD2: action
});
