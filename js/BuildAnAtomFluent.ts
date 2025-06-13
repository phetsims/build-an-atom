// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from build-an-atom-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import buildAnAtom from './buildAnAtom.js';
import BuildAnAtomStrings from './BuildAnAtomStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, sp: TReadOnlyProperty<string> | undefined ) => {
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'build_an_atom_title', BuildAnAtomStrings?.["build-an-atom"]?.["titleStringProperty"] );
addToMapIfDefined( 'positive', BuildAnAtomStrings?.["positiveStringProperty"] );
addToMapIfDefined( 'negative', BuildAnAtomStrings?.["negativeStringProperty"] );
addToMapIfDefined( 'ion', BuildAnAtomStrings?.["ionStringProperty"] );
addToMapIfDefined( 'stableSlashUnstable', BuildAnAtomStrings?.["stableSlashUnstableStringProperty"] );
addToMapIfDefined( 'symbol', BuildAnAtomStrings?.["symbolStringProperty"] );
addToMapIfDefined( 'findTheElement', BuildAnAtomStrings?.["findTheElementStringProperty"] );
addToMapIfDefined( 'massNumber', BuildAnAtomStrings?.["massNumberStringProperty"] );
addToMapIfDefined( 'atom', BuildAnAtomStrings?.["atomStringProperty"] );
addToMapIfDefined( 'netCharge', BuildAnAtomStrings?.["netChargeStringProperty"] );
addToMapIfDefined( 'element', BuildAnAtomStrings?.["elementStringProperty"] );
addToMapIfDefined( 'orbits', BuildAnAtomStrings?.["orbitsStringProperty"] );
addToMapIfDefined( 'model', BuildAnAtomStrings?.["modelStringProperty"] );
addToMapIfDefined( 'whatIsTheMassNumber', BuildAnAtomStrings?.["whatIsTheMassNumberStringProperty"] );
addToMapIfDefined( 'whatIsTheTotalCharge', BuildAnAtomStrings?.["whatIsTheTotalChargeStringProperty"] );
addToMapIfDefined( 'electronsColon', BuildAnAtomStrings?.["electronsColonStringProperty"] );
addToMapIfDefined( 'game', BuildAnAtomStrings?.["gameStringProperty"] );
addToMapIfDefined( 'neutralAtom', BuildAnAtomStrings?.["neutralAtomStringProperty"] );
addToMapIfDefined( 'neutralSlashIon', BuildAnAtomStrings?.["neutralSlashIonStringProperty"] );
addToMapIfDefined( 'neutrons', BuildAnAtomStrings?.["neutronsStringProperty"] );
addToMapIfDefined( 'protonsColon', BuildAnAtomStrings?.["protonsColonStringProperty"] );
addToMapIfDefined( 'cloud', BuildAnAtomStrings?.["cloudStringProperty"] );
addToMapIfDefined( 'neutronsColon', BuildAnAtomStrings?.["neutronsColonStringProperty"] );
addToMapIfDefined( 'electrons', BuildAnAtomStrings?.["electronsStringProperty"] );
addToMapIfDefined( 'isIt', BuildAnAtomStrings?.["isItStringProperty"] );
addToMapIfDefined( 'protons', BuildAnAtomStrings?.["protonsStringProperty"] );
addToMapIfDefined( 'show', BuildAnAtomStrings?.["showStringProperty"] );
addToMapIfDefined( 'chooseYourGame', BuildAnAtomStrings?.["chooseYourGameStringProperty"] );
addToMapIfDefined( 'highContrastParticles', BuildAnAtomStrings?.["highContrastParticlesStringProperty"] );

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
    titleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'build_an_atom_title' )
  },
  positiveStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'positive' ),
  negativeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'negative' ),
  ionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'ion' ),
  stableSlashUnstableStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'stableSlashUnstable' ),
  symbolStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'symbol' ),
  findTheElementStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'findTheElement' ),
  massNumberStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'massNumber' ),
  atomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'atom' ),
  netChargeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'netCharge' ),
  elementStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'element' ),
  orbitsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'orbits' ),
  modelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'model' ),
  whatIsTheMassNumberStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'whatIsTheMassNumber' ),
  whatIsTheTotalChargeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'whatIsTheTotalCharge' ),
  electronsColonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'electronsColon' ),
  electronsColonPatternStringProperty: BuildAnAtomStrings?.["electronsColonPatternStringProperty"],
  gameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'game' ),
  neutralAtomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'neutralAtom' ),
  neutralSlashIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'neutralSlashIon' ),
  neutronsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'neutrons' ),
  protonsColonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'protonsColon' ),
  protonsColonPatternStringProperty: BuildAnAtomStrings?.["protonsColonPatternStringProperty"],
  cloudStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'cloud' ),
  neutronsColonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'neutronsColon' ),
  neutronsColonPatternStringProperty: BuildAnAtomStrings?.["neutronsColonPatternStringProperty"],
  electronsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'electrons' ),
  isItStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'isIt' ),
  protonsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'protons' ),
  showStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'show' ),
  chooseYourGameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'chooseYourGame' ),
  highContrastParticlesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'highContrastParticles' )
};

export default BuildAnAtomFluent;

buildAnAtom.register('BuildAnAtomFluent', BuildAnAtomFluent);
