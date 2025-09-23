// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from build-an-atom-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
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
addToMapIfDefined( 'periodicTable', 'periodicTableStringProperty' );
addToMapIfDefined( 'protonsColon', 'protonsColonStringProperty' );
addToMapIfDefined( 'cloud', 'cloudStringProperty' );
addToMapIfDefined( 'neutronsColon', 'neutronsColonStringProperty' );
addToMapIfDefined( 'electrons', 'electronsStringProperty' );
addToMapIfDefined( 'isIt', 'isItStringProperty' );
addToMapIfDefined( 'protons', 'protonsStringProperty' );
addToMapIfDefined( 'show', 'showStringProperty' );
addToMapIfDefined( 'chooseYourGame', 'chooseYourGameStringProperty' );
addToMapIfDefined( 'gamesInfoTitle', 'gamesInfoTitleStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_screenIcon_accessibleHelpText', 'a11y.atomScreen.screenIcon.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_noElementContextResponse', 'a11y.atomScreen.noElementContextResponseStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_elementNameCheckbox_accessibleName', 'a11y.atomScreen.elementNameCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_elementNameCheckbox_accessibleHelpText', 'a11y.atomScreen.elementNameCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_elementNameCheckbox_accessibleContextResponseUnchecked', 'a11y.atomScreen.elementNameCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_neutralAtomIonCheckbox_accessibleName', 'a11y.atomScreen.neutralAtomIonCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_neutralAtomIonCheckbox_accessibleHelpText', 'a11y.atomScreen.neutralAtomIonCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_neutralAtomIonCheckbox_accessibleContextResponseUnchecked', 'a11y.atomScreen.neutralAtomIonCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_neutralAtomIonCheckbox_neutralAtom', 'a11y.atomScreen.neutralAtomIonCheckbox.neutralAtomStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_neutralAtomIonCheckbox_positiveIon', 'a11y.atomScreen.neutralAtomIonCheckbox.positiveIonStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_neutralAtomIonCheckbox_negativeIon', 'a11y.atomScreen.neutralAtomIonCheckbox.negativeIonStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_nuclearStabilityCheckbox_accessibleName', 'a11y.atomScreen.nuclearStabilityCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_nuclearStabilityCheckbox_accessibleHelpText', 'a11y.atomScreen.nuclearStabilityCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_nuclearStabilityCheckbox_accessibleContextResponseUnchecked', 'a11y.atomScreen.nuclearStabilityCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_modelToggle_accessibleName', 'a11y.atomScreen.modelToggle.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_modelToggle_accessibleNameOrbits', 'a11y.atomScreen.modelToggle.accessibleNameOrbitsStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_modelToggle_accessibleNameCloud', 'a11y.atomScreen.modelToggle.accessibleNameCloudStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_modelToggle_accessibleHelpText', 'a11y.atomScreen.modelToggle.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_protonBucket_accessibleName', 'a11y.atomScreen.protonBucket.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_neutronBucket_accessibleName', 'a11y.atomScreen.neutronBucket.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_electronBucket_accessibleName', 'a11y.atomScreen.electronBucket.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_periodicTable_accessibleName', 'a11y.atomScreen.periodicTable.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_periodicTable_accessibleParagraphNoSymbol', 'a11y.atomScreen.periodicTable.accessibleParagraphNoSymbolStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_netCharge_accessibleName', 'a11y.atomScreen.netCharge.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_massNumber_accessibleName', 'a11y.atomScreen.massNumber.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_symbolScreen_screenIcon_accessibleHelpText', 'a11y.symbolScreen.screenIcon.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_screenIcon_accessibleHelpText', 'a11y.gameScreen.screenIcon.accessibleHelpTextStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${stringProperty.value.replace('\n','\n ')}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const BuildAnAtomFluent = {
  "build-an-atom": {
    titleStringProperty: _.get( BuildAnAtomStrings, 'build-an-atom.titleStringProperty' )
  },
  positiveStringProperty: _.get( BuildAnAtomStrings, 'positiveStringProperty' ),
  negativeStringProperty: _.get( BuildAnAtomStrings, 'negativeStringProperty' ),
  ionStringProperty: _.get( BuildAnAtomStrings, 'ionStringProperty' ),
  stableSlashUnstableStringProperty: _.get( BuildAnAtomStrings, 'stableSlashUnstableStringProperty' ),
  symbolStringProperty: _.get( BuildAnAtomStrings, 'symbolStringProperty' ),
  findTheElementStringProperty: _.get( BuildAnAtomStrings, 'findTheElementStringProperty' ),
  massNumberStringProperty: _.get( BuildAnAtomStrings, 'massNumberStringProperty' ),
  atomStringProperty: _.get( BuildAnAtomStrings, 'atomStringProperty' ),
  netChargeStringProperty: _.get( BuildAnAtomStrings, 'netChargeStringProperty' ),
  elementStringProperty: _.get( BuildAnAtomStrings, 'elementStringProperty' ),
  orbitsStringProperty: _.get( BuildAnAtomStrings, 'orbitsStringProperty' ),
  modelStringProperty: _.get( BuildAnAtomStrings, 'modelStringProperty' ),
  whatIsTheMassNumberStringProperty: _.get( BuildAnAtomStrings, 'whatIsTheMassNumberStringProperty' ),
  whatIsTheTotalChargeStringProperty: _.get( BuildAnAtomStrings, 'whatIsTheTotalChargeStringProperty' ),
  electronsColonStringProperty: _.get( BuildAnAtomStrings, 'electronsColonStringProperty' ),
  electronsColonPatternStringProperty: _.get( BuildAnAtomStrings, 'electronsColonPatternStringProperty' ),
  gameStringProperty: _.get( BuildAnAtomStrings, 'gameStringProperty' ),
  gameNumberPatternStringProperty: _.get( BuildAnAtomStrings, 'gameNumberPatternStringProperty' ),
  neutralAtomStringProperty: _.get( BuildAnAtomStrings, 'neutralAtomStringProperty' ),
  neutralSlashIonStringProperty: _.get( BuildAnAtomStrings, 'neutralSlashIonStringProperty' ),
  neutronsStringProperty: _.get( BuildAnAtomStrings, 'neutronsStringProperty' ),
  periodicTableStringProperty: _.get( BuildAnAtomStrings, 'periodicTableStringProperty' ),
  protonsColonStringProperty: _.get( BuildAnAtomStrings, 'protonsColonStringProperty' ),
  protonsColonPatternStringProperty: _.get( BuildAnAtomStrings, 'protonsColonPatternStringProperty' ),
  cloudStringProperty: _.get( BuildAnAtomStrings, 'cloudStringProperty' ),
  neutronsColonStringProperty: _.get( BuildAnAtomStrings, 'neutronsColonStringProperty' ),
  neutronsColonPatternStringProperty: _.get( BuildAnAtomStrings, 'neutronsColonPatternStringProperty' ),
  electronsStringProperty: _.get( BuildAnAtomStrings, 'electronsStringProperty' ),
  isItStringProperty: _.get( BuildAnAtomStrings, 'isItStringProperty' ),
  protonsStringProperty: _.get( BuildAnAtomStrings, 'protonsStringProperty' ),
  showStringProperty: _.get( BuildAnAtomStrings, 'showStringProperty' ),
  chooseYourGameStringProperty: _.get( BuildAnAtomStrings, 'chooseYourGameStringProperty' ),
  gamesInfoTitleStringProperty: _.get( BuildAnAtomStrings, 'gamesInfoTitleStringProperty' ),
  level1DescriptionPatternStringProperty: _.get( BuildAnAtomStrings, 'level1DescriptionPatternStringProperty' ),
  level2DescriptionPatternStringProperty: _.get( BuildAnAtomStrings, 'level2DescriptionPatternStringProperty' ),
  level3DescriptionPatternStringProperty: _.get( BuildAnAtomStrings, 'level3DescriptionPatternStringProperty' ),
  level4DescriptionPatternStringProperty: _.get( BuildAnAtomStrings, 'level4DescriptionPatternStringProperty' ),
  a11y: {
    atomScreen: {
      screenIcon: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_screenIcon_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.atomScreen.screenIcon.accessibleHelpTextStringProperty' ) )
      },
      noElementContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_noElementContextResponse', _.get( BuildAnAtomStrings, 'a11y.atomScreen.noElementContextResponseStringProperty' ) ),
      elementNameCheckbox: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_elementNameCheckbox_accessibleName', _.get( BuildAnAtomStrings, 'a11y.atomScreen.elementNameCheckbox.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_elementNameCheckbox_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.atomScreen.elementNameCheckbox.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponseCheckedStringProperty: _.get( BuildAnAtomStrings, 'a11y.atomScreen.elementNameCheckbox.accessibleContextResponseCheckedStringProperty' ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_elementNameCheckbox_accessibleContextResponseUnchecked', _.get( BuildAnAtomStrings, 'a11y.atomScreen.elementNameCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
      },
      neutralAtomIonCheckbox: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_neutralAtomIonCheckbox_accessibleName', _.get( BuildAnAtomStrings, 'a11y.atomScreen.neutralAtomIonCheckbox.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_neutralAtomIonCheckbox_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.atomScreen.neutralAtomIonCheckbox.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_neutralAtomIonCheckbox_accessibleContextResponseUnchecked', _.get( BuildAnAtomStrings, 'a11y.atomScreen.neutralAtomIonCheckbox.accessibleContextResponseUncheckedStringProperty' ) ),
        neutralAtomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_neutralAtomIonCheckbox_neutralAtom', _.get( BuildAnAtomStrings, 'a11y.atomScreen.neutralAtomIonCheckbox.neutralAtomStringProperty' ) ),
        positiveIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_neutralAtomIonCheckbox_positiveIon', _.get( BuildAnAtomStrings, 'a11y.atomScreen.neutralAtomIonCheckbox.positiveIonStringProperty' ) ),
        negativeIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_neutralAtomIonCheckbox_negativeIon', _.get( BuildAnAtomStrings, 'a11y.atomScreen.neutralAtomIonCheckbox.negativeIonStringProperty' ) )
      },
      nuclearStabilityCheckbox: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_nuclearStabilityCheckbox_accessibleName', _.get( BuildAnAtomStrings, 'a11y.atomScreen.nuclearStabilityCheckbox.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_nuclearStabilityCheckbox_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.atomScreen.nuclearStabilityCheckbox.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponseCheckedStringProperty: _.get( BuildAnAtomStrings, 'a11y.atomScreen.nuclearStabilityCheckbox.accessibleContextResponseCheckedStringProperty' ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_nuclearStabilityCheckbox_accessibleContextResponseUnchecked', _.get( BuildAnAtomStrings, 'a11y.atomScreen.nuclearStabilityCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
      },
      modelToggle: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_modelToggle_accessibleName', _.get( BuildAnAtomStrings, 'a11y.atomScreen.modelToggle.accessibleNameStringProperty' ) ),
        accessibleNameOrbitsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_modelToggle_accessibleNameOrbits', _.get( BuildAnAtomStrings, 'a11y.atomScreen.modelToggle.accessibleNameOrbitsStringProperty' ) ),
        accessibleNameCloudStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_modelToggle_accessibleNameCloud', _.get( BuildAnAtomStrings, 'a11y.atomScreen.modelToggle.accessibleNameCloudStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_modelToggle_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.atomScreen.modelToggle.accessibleHelpTextStringProperty' ) )
      },
      protonBucket: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_protonBucket_accessibleName', _.get( BuildAnAtomStrings, 'a11y.atomScreen.protonBucket.accessibleNameStringProperty' ) )
      },
      neutronBucket: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_neutronBucket_accessibleName', _.get( BuildAnAtomStrings, 'a11y.atomScreen.neutronBucket.accessibleNameStringProperty' ) )
      },
      electronBucket: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_electronBucket_accessibleName', _.get( BuildAnAtomStrings, 'a11y.atomScreen.electronBucket.accessibleNameStringProperty' ) )
      },
      periodicTable: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_periodicTable_accessibleName', _.get( BuildAnAtomStrings, 'a11y.atomScreen.periodicTable.accessibleNameStringProperty' ) ),
        accessibleParagraphHighlightedStringProperty: _.get( BuildAnAtomStrings, 'a11y.atomScreen.periodicTable.accessibleParagraphHighlightedStringProperty' ),
        accessibleParagraphNoSymbolStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_periodicTable_accessibleParagraphNoSymbol', _.get( BuildAnAtomStrings, 'a11y.atomScreen.periodicTable.accessibleParagraphNoSymbolStringProperty' ) ),
        accessibleContextResponseStringProperty: _.get( BuildAnAtomStrings, 'a11y.atomScreen.periodicTable.accessibleContextResponseStringProperty' )
      },
      netCharge: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_netCharge_accessibleName', _.get( BuildAnAtomStrings, 'a11y.atomScreen.netCharge.accessibleNameStringProperty' ) ),
        accessibleParagraphStringProperty: _.get( BuildAnAtomStrings, 'a11y.atomScreen.netCharge.accessibleParagraphStringProperty' ),
        accessibleContextResponseStringProperty: _.get( BuildAnAtomStrings, 'a11y.atomScreen.netCharge.accessibleContextResponseStringProperty' )
      },
      massNumber: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_massNumber_accessibleName', _.get( BuildAnAtomStrings, 'a11y.atomScreen.massNumber.accessibleNameStringProperty' ) ),
        accessibleParagraphStringProperty: _.get( BuildAnAtomStrings, 'a11y.atomScreen.massNumber.accessibleParagraphStringProperty' ),
        accessibleContextResponseStringProperty: _.get( BuildAnAtomStrings, 'a11y.atomScreen.massNumber.accessibleContextResponseStringProperty' )
      },
      particleCounts: {
        accessibleListNodeStringProperty: _.get( BuildAnAtomStrings, 'a11y.atomScreen.particleCounts.accessibleListNodeStringProperty' )
      }
    },
    symbolScreen: {
      screenIcon: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_symbolScreen_screenIcon_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.symbolScreen.screenIcon.accessibleHelpTextStringProperty' ) )
      }
    },
    gameScreen: {
      screenIcon: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_screenIcon_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.screenIcon.accessibleHelpTextStringProperty' ) )
      }
    }
  }
};

export default BuildAnAtomFluent;

buildAnAtom.register('BuildAnAtomFluent', BuildAnAtomFluent);
