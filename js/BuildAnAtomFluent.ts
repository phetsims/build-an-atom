// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from build-an-atom-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import type { FluentVariable } from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import buildAnAtom from './buildAnAtom.js';
import BuildAnAtomStrings from './BuildAnAtomStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, path: string ) => {
  const sp = _.get( BuildAnAtomStrings, path );
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'build_an_atom_title', 'build-an-atom.titleStringProperty' );
addToMapIfDefined( 'positive', 'positiveStringProperty' );
addToMapIfDefined( 'negative', 'negativeStringProperty' );
addToMapIfDefined( 'ion', 'ionStringProperty' );
addToMapIfDefined( 'stableSlashUnstable', 'stableSlashUnstableStringProperty' );
addToMapIfDefined( 'symbol', 'symbolStringProperty' );
addToMapIfDefined( 'findTheElement', 'findTheElementStringProperty' );
addToMapIfDefined( 'massNumber', 'massNumberStringProperty' );
addToMapIfDefined( 'atom', 'atomStringProperty' );
addToMapIfDefined( 'netCharge', 'netChargeStringProperty' );
addToMapIfDefined( 'element', 'elementStringProperty' );
addToMapIfDefined( 'orbits', 'orbitsStringProperty' );
addToMapIfDefined( 'model', 'modelStringProperty' );
addToMapIfDefined( 'whatIsTheMassNumber', 'whatIsTheMassNumberStringProperty' );
addToMapIfDefined( 'whatIsTheTotalCharge', 'whatIsTheTotalChargeStringProperty' );
addToMapIfDefined( 'electronsColon', 'electronsColonStringProperty' );
addToMapIfDefined( 'game', 'gameStringProperty' );
addToMapIfDefined( 'neutralAtom', 'neutralAtomStringProperty' );
addToMapIfDefined( 'neutralSlashIon', 'neutralSlashIonStringProperty' );
addToMapIfDefined( 'neutrons', 'neutronsStringProperty' );
addToMapIfDefined( 'protonsColon', 'protonsColonStringProperty' );
addToMapIfDefined( 'cloud', 'cloudStringProperty' );
addToMapIfDefined( 'neutronsColon', 'neutronsColonStringProperty' );
addToMapIfDefined( 'electrons', 'electronsStringProperty' );
addToMapIfDefined( 'isIt', 'isItStringProperty' );
addToMapIfDefined( 'protons', 'protonsStringProperty' );
addToMapIfDefined( 'show', 'showStringProperty' );
addToMapIfDefined( 'chooseYourGame', 'chooseYourGameStringProperty' );
addToMapIfDefined( 'highContrastParticles', 'highContrastParticlesStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${stringProperty.value}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const BuildAnAtomFluent = {
  "build-an-atom": {
    titleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'build_an_atom_title', _.get( BuildAnAtomStrings, 'build-an-atom.titleStringProperty' )  )
  },
  positiveStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'positive', _.get( BuildAnAtomStrings, 'positiveStringProperty' )  ),
  negativeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'negative', _.get( BuildAnAtomStrings, 'negativeStringProperty' )  ),
  ionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'ion', _.get( BuildAnAtomStrings, 'ionStringProperty' )  ),
  stableSlashUnstableStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'stableSlashUnstable', _.get( BuildAnAtomStrings, 'stableSlashUnstableStringProperty' )  ),
  symbolStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'symbol', _.get( BuildAnAtomStrings, 'symbolStringProperty' )  ),
  findTheElementStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'findTheElement', _.get( BuildAnAtomStrings, 'findTheElementStringProperty' )  ),
  massNumberStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'massNumber', _.get( BuildAnAtomStrings, 'massNumberStringProperty' )  ),
  atomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'atom', _.get( BuildAnAtomStrings, 'atomStringProperty' )  ),
  netChargeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'netCharge', _.get( BuildAnAtomStrings, 'netChargeStringProperty' )  ),
  elementStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'element', _.get( BuildAnAtomStrings, 'elementStringProperty' )  ),
  orbitsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'orbits', _.get( BuildAnAtomStrings, 'orbitsStringProperty' )  ),
  modelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'model', _.get( BuildAnAtomStrings, 'modelStringProperty' )  ),
  whatIsTheMassNumberStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'whatIsTheMassNumber', _.get( BuildAnAtomStrings, 'whatIsTheMassNumberStringProperty' )  ),
  whatIsTheTotalChargeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'whatIsTheTotalCharge', _.get( BuildAnAtomStrings, 'whatIsTheTotalChargeStringProperty' )  ),
  electronsColonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'electronsColon', _.get( BuildAnAtomStrings, 'electronsColonStringProperty' )  ),
  electronsColonPatternStringProperty: _.get( BuildAnAtomStrings, 'electronsColonPatternStringProperty' ),
  gameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'game', _.get( BuildAnAtomStrings, 'gameStringProperty' )  ),
  neutralAtomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'neutralAtom', _.get( BuildAnAtomStrings, 'neutralAtomStringProperty' )  ),
  neutralSlashIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'neutralSlashIon', _.get( BuildAnAtomStrings, 'neutralSlashIonStringProperty' )  ),
  neutronsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'neutrons', _.get( BuildAnAtomStrings, 'neutronsStringProperty' )  ),
  protonsColonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'protonsColon', _.get( BuildAnAtomStrings, 'protonsColonStringProperty' )  ),
  protonsColonPatternStringProperty: _.get( BuildAnAtomStrings, 'protonsColonPatternStringProperty' ),
  cloudStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'cloud', _.get( BuildAnAtomStrings, 'cloudStringProperty' )  ),
  neutronsColonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'neutronsColon', _.get( BuildAnAtomStrings, 'neutronsColonStringProperty' )  ),
  neutronsColonPatternStringProperty: _.get( BuildAnAtomStrings, 'neutronsColonPatternStringProperty' ),
  electronsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'electrons', _.get( BuildAnAtomStrings, 'electronsStringProperty' )  ),
  isItStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'isIt', _.get( BuildAnAtomStrings, 'isItStringProperty' )  ),
  protonsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'protons', _.get( BuildAnAtomStrings, 'protonsStringProperty' )  ),
  showStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'show', _.get( BuildAnAtomStrings, 'showStringProperty' )  ),
  chooseYourGameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'chooseYourGame', _.get( BuildAnAtomStrings, 'chooseYourGameStringProperty' )  ),
  highContrastParticlesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'highContrastParticles', _.get( BuildAnAtomStrings, 'highContrastParticlesStringProperty' )  )
};

export default BuildAnAtomFluent;

buildAnAtom.register('BuildAnAtomFluent', BuildAnAtomFluent);
