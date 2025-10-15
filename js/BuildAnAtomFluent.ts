// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from build-an-atom-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import {TReadOnlyProperty} from '../../axon/js/TReadOnlyProperty.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
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
addToMapIfDefined( 'model', 'modelStringProperty' );
addToMapIfDefined( 'shells', 'shellsStringProperty' );
addToMapIfDefined( 'cloud', 'cloudStringProperty' );
addToMapIfDefined( 'whatIsTheMassNumber', 'whatIsTheMassNumberStringProperty' );
addToMapIfDefined( 'whatIsTheTotalCharge', 'whatIsTheTotalChargeStringProperty' );
addToMapIfDefined( 'electronsColon', 'electronsColonStringProperty' );
addToMapIfDefined( 'game', 'gameStringProperty' );
addToMapIfDefined( 'neutralAtom', 'neutralAtomStringProperty' );
addToMapIfDefined( 'neutralSlashIon', 'neutralSlashIonStringProperty' );
addToMapIfDefined( 'neutrons', 'neutronsStringProperty' );
addToMapIfDefined( 'periodicTable', 'periodicTableStringProperty' );
addToMapIfDefined( 'protonsColon', 'protonsColonStringProperty' );
addToMapIfDefined( 'neutronsColon', 'neutronsColonStringProperty' );
addToMapIfDefined( 'electrons', 'electronsStringProperty' );
addToMapIfDefined( 'isIt', 'isItStringProperty' );
addToMapIfDefined( 'protons', 'protonsStringProperty' );
addToMapIfDefined( 'show', 'showStringProperty' );
addToMapIfDefined( 'chooseYourGame', 'chooseYourGameStringProperty' );
addToMapIfDefined( 'gamesInfoTitle', 'gamesInfoTitleStringProperty' );
addToMapIfDefined( 'a11y_common_accordionAccessibleContextResponse_expanded', 'a11y.common.accordionAccessibleContextResponse.expandedStringProperty' );
addToMapIfDefined( 'a11y_common_accordionAccessibleContextResponse_collapsed', 'a11y.common.accordionAccessibleContextResponse.collapsedStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_accessibleHeading', 'a11y.common.atomAccessibleListNode.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_nucleusInfoEmpty', 'a11y.common.atomAccessibleListNode.nucleusInfoEmptyStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_protons', 'a11y.common.atomAccessibleListNode.protonsStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_neutrons', 'a11y.common.atomAccessibleListNode.neutronsStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_protonsAndNeutrons', 'a11y.common.atomAccessibleListNode.protonsAndNeutronsStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_shellInfoFull', 'a11y.common.atomAccessibleListNode.shellInfoFullStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_cloudInfoFull', 'a11y.common.atomAccessibleListNode.cloudInfoFullStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_shellInfoEmpty', 'a11y.common.atomAccessibleListNode.shellInfoEmptyStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_cloudInfoEmpty', 'a11y.common.atomAccessibleListNode.cloudInfoEmptyStringProperty' );
addToMapIfDefined( 'a11y_common_noElementContextResponse', 'a11y.common.noElementContextResponseStringProperty' );
addToMapIfDefined( 'a11y_common_elementNameCheckbox_accessibleName', 'a11y.common.elementNameCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_elementNameCheckbox_accessibleHelpText', 'a11y.common.elementNameCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_elementNameCheckbox_accessibleContextResponseUnchecked', 'a11y.common.elementNameCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_common_neutralAtomIonCheckbox_accessibleName', 'a11y.common.neutralAtomIonCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_neutralAtomIonCheckbox_accessibleHelpText', 'a11y.common.neutralAtomIonCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_neutralAtomIonCheckbox_accessibleContextResponseUnchecked', 'a11y.common.neutralAtomIonCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_common_neutralAtomIonCheckbox_neutralAtom', 'a11y.common.neutralAtomIonCheckbox.neutralAtomStringProperty' );
addToMapIfDefined( 'a11y_common_neutralAtomIonCheckbox_positiveIon', 'a11y.common.neutralAtomIonCheckbox.positiveIonStringProperty' );
addToMapIfDefined( 'a11y_common_neutralAtomIonCheckbox_negativeIon', 'a11y.common.neutralAtomIonCheckbox.negativeIonStringProperty' );
addToMapIfDefined( 'a11y_common_nuclearStabilityCheckbox_accessibleName', 'a11y.common.nuclearStabilityCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_nuclearStabilityCheckbox_accessibleHelpText', 'a11y.common.nuclearStabilityCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_nuclearStabilityCheckbox_accessibleContextResponseUnchecked', 'a11y.common.nuclearStabilityCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_common_nuclearStabilityCheckbox_stable', 'a11y.common.nuclearStabilityCheckbox.stableStringProperty' );
addToMapIfDefined( 'a11y_common_nuclearStabilityCheckbox_unstable', 'a11y.common.nuclearStabilityCheckbox.unstableStringProperty' );
addToMapIfDefined( 'a11y_common_modelToggle_accessibleName', 'a11y.common.modelToggle.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_modelToggle_accessibleNameShells', 'a11y.common.modelToggle.accessibleNameShellsStringProperty' );
addToMapIfDefined( 'a11y_common_modelToggle_accessibleNameCloud', 'a11y.common.modelToggle.accessibleNameCloudStringProperty' );
addToMapIfDefined( 'a11y_common_modelToggle_accessibleHelpText', 'a11y.common.modelToggle.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_periodicTable_accessibleName', 'a11y.common.periodicTable.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_periodicTable_accessibleParagraphNoSymbol', 'a11y.common.periodicTable.accessibleParagraphNoSymbolStringProperty' );
addToMapIfDefined( 'a11y_common_screenSummary_playArea', 'a11y.common.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_common_screenSummary_controlArea', 'a11y.common.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_common_screenSummary_interactionHint', 'a11y.common.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_screenIcon_accessibleHelpText', 'a11y.atomScreen.screenIcon.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_netCharge_accessibleName', 'a11y.atomScreen.netCharge.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_massNumber_accessibleName', 'a11y.atomScreen.massNumber.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_symbolScreen_screenSummary_playArea', 'a11y.symbolScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_symbolScreen_screenIcon_accessibleHelpText', 'a11y.symbolScreen.screenIcon.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_symbolScreen_symbol_accessibleName', 'a11y.symbolScreen.symbol.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_symbolScreen_symbol_noSymbol', 'a11y.symbolScreen.symbol.noSymbolStringProperty' );
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
  modelStringProperty: _.get( BuildAnAtomStrings, 'modelStringProperty' ),
  shellsStringProperty: _.get( BuildAnAtomStrings, 'shellsStringProperty' ),
  cloudStringProperty: _.get( BuildAnAtomStrings, 'cloudStringProperty' ),
  whatIsTheMassNumberStringProperty: _.get( BuildAnAtomStrings, 'whatIsTheMassNumberStringProperty' ),
  whatIsTheTotalChargeStringProperty: _.get( BuildAnAtomStrings, 'whatIsTheTotalChargeStringProperty' ),
  electronsColonStringProperty: _.get( BuildAnAtomStrings, 'electronsColonStringProperty' ),
  electronsColonPatternStringProperty: _.get( BuildAnAtomStrings, 'electronsColonPatternStringProperty' ),
  gameStringProperty: _.get( BuildAnAtomStrings, 'gameStringProperty' ),
  neutralAtomStringProperty: _.get( BuildAnAtomStrings, 'neutralAtomStringProperty' ),
  neutralSlashIonStringProperty: _.get( BuildAnAtomStrings, 'neutralSlashIonStringProperty' ),
  neutronsStringProperty: _.get( BuildAnAtomStrings, 'neutronsStringProperty' ),
  periodicTableStringProperty: _.get( BuildAnAtomStrings, 'periodicTableStringProperty' ),
  protonsColonStringProperty: _.get( BuildAnAtomStrings, 'protonsColonStringProperty' ),
  protonsColonPatternStringProperty: _.get( BuildAnAtomStrings, 'protonsColonPatternStringProperty' ),
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
    common: {
      mathSpeakUpperStringProperty: _.get( BuildAnAtomStrings, 'a11y.common.mathSpeakUpperStringProperty' ),
      accordionAccessibleContextResponse: {
        expandedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_accordionAccessibleContextResponse_expanded', _.get( BuildAnAtomStrings, 'a11y.common.accordionAccessibleContextResponse.expandedStringProperty' ) ),
        collapsedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_accordionAccessibleContextResponse_collapsed', _.get( BuildAnAtomStrings, 'a11y.common.accordionAccessibleContextResponse.collapsedStringProperty' ) )
      },
      atomAccessibleListNode: {
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_accessibleHeading', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.accessibleHeadingStringProperty' ) ),
        nucleusInfoFullStringProperty: _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.nucleusInfoFullStringProperty' ),
        nucleusInfoEmptyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_nucleusInfoEmpty', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.nucleusInfoEmptyStringProperty' ) ),
        protonsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_protons', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.protonsStringProperty' ) ),
        neutronsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_neutrons', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.neutronsStringProperty' ) ),
        protonsAndNeutronsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_protonsAndNeutrons', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.protonsAndNeutronsStringProperty' ) ),
        shellInfoFull: new FluentPattern<{ inner: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, outer: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_shellInfoFull', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.shellInfoFullStringProperty' ), [{"name":"inner","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"outer","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        cloudInfoFull: new FluentPattern<{ value: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_cloudInfoFull', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.cloudInfoFullStringProperty' ), [{"name":"value","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        shellInfoEmptyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_shellInfoEmpty', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.shellInfoEmptyStringProperty' ) ),
        cloudInfoEmptyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_cloudInfoEmpty', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.cloudInfoEmptyStringProperty' ) )
      },
      noElementContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_noElementContextResponse', _.get( BuildAnAtomStrings, 'a11y.common.noElementContextResponseStringProperty' ) ),
      elementNameCheckbox: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_elementNameCheckbox_accessibleName', _.get( BuildAnAtomStrings, 'a11y.common.elementNameCheckbox.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_elementNameCheckbox_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.common.elementNameCheckbox.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponseCheckedStringProperty: _.get( BuildAnAtomStrings, 'a11y.common.elementNameCheckbox.accessibleContextResponseCheckedStringProperty' ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_elementNameCheckbox_accessibleContextResponseUnchecked', _.get( BuildAnAtomStrings, 'a11y.common.elementNameCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
      },
      neutralAtomIonCheckbox: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_neutralAtomIonCheckbox_accessibleName', _.get( BuildAnAtomStrings, 'a11y.common.neutralAtomIonCheckbox.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_neutralAtomIonCheckbox_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.common.neutralAtomIonCheckbox.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_neutralAtomIonCheckbox_accessibleContextResponseUnchecked', _.get( BuildAnAtomStrings, 'a11y.common.neutralAtomIonCheckbox.accessibleContextResponseUncheckedStringProperty' ) ),
        neutralAtomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_neutralAtomIonCheckbox_neutralAtom', _.get( BuildAnAtomStrings, 'a11y.common.neutralAtomIonCheckbox.neutralAtomStringProperty' ) ),
        positiveIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_neutralAtomIonCheckbox_positiveIon', _.get( BuildAnAtomStrings, 'a11y.common.neutralAtomIonCheckbox.positiveIonStringProperty' ) ),
        negativeIonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_neutralAtomIonCheckbox_negativeIon', _.get( BuildAnAtomStrings, 'a11y.common.neutralAtomIonCheckbox.negativeIonStringProperty' ) )
      },
      nuclearStabilityCheckbox: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_nuclearStabilityCheckbox_accessibleName', _.get( BuildAnAtomStrings, 'a11y.common.nuclearStabilityCheckbox.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_nuclearStabilityCheckbox_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.common.nuclearStabilityCheckbox.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponseCheckedStringProperty: _.get( BuildAnAtomStrings, 'a11y.common.nuclearStabilityCheckbox.accessibleContextResponseCheckedStringProperty' ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_nuclearStabilityCheckbox_accessibleContextResponseUnchecked', _.get( BuildAnAtomStrings, 'a11y.common.nuclearStabilityCheckbox.accessibleContextResponseUncheckedStringProperty' ) ),
        stableStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_nuclearStabilityCheckbox_stable', _.get( BuildAnAtomStrings, 'a11y.common.nuclearStabilityCheckbox.stableStringProperty' ) ),
        unstableStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_nuclearStabilityCheckbox_unstable', _.get( BuildAnAtomStrings, 'a11y.common.nuclearStabilityCheckbox.unstableStringProperty' ) )
      },
      modelToggle: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_modelToggle_accessibleName', _.get( BuildAnAtomStrings, 'a11y.common.modelToggle.accessibleNameStringProperty' ) ),
        accessibleNameShellsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_modelToggle_accessibleNameShells', _.get( BuildAnAtomStrings, 'a11y.common.modelToggle.accessibleNameShellsStringProperty' ) ),
        accessibleNameCloudStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_modelToggle_accessibleNameCloud', _.get( BuildAnAtomStrings, 'a11y.common.modelToggle.accessibleNameCloudStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_modelToggle_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.common.modelToggle.accessibleHelpTextStringProperty' ) )
      },
      periodicTable: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_periodicTable_accessibleName', _.get( BuildAnAtomStrings, 'a11y.common.periodicTable.accessibleNameStringProperty' ) ),
        accessibleParagraphHighlightedStringProperty: _.get( BuildAnAtomStrings, 'a11y.common.periodicTable.accessibleParagraphHighlightedStringProperty' ),
        accessibleParagraphNoSymbolStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_periodicTable_accessibleParagraphNoSymbol', _.get( BuildAnAtomStrings, 'a11y.common.periodicTable.accessibleParagraphNoSymbolStringProperty' ) )
      },
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_screenSummary_playArea', _.get( BuildAnAtomStrings, 'a11y.common.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_screenSummary_controlArea', _.get( BuildAnAtomStrings, 'a11y.common.screenSummary.controlAreaStringProperty' ) ),
        currentDetailsStringProperty: _.get( BuildAnAtomStrings, 'a11y.common.screenSummary.currentDetailsStringProperty' ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_screenSummary_interactionHint', _.get( BuildAnAtomStrings, 'a11y.common.screenSummary.interactionHintStringProperty' ) )
      }
    },
    atomScreen: {
      screenIcon: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_screenIcon_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.atomScreen.screenIcon.accessibleHelpTextStringProperty' ) )
      },
      netCharge: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_netCharge_accessibleName', _.get( BuildAnAtomStrings, 'a11y.atomScreen.netCharge.accessibleNameStringProperty' ) ),
        accessibleParagraphStringProperty: _.get( BuildAnAtomStrings, 'a11y.atomScreen.netCharge.accessibleParagraphStringProperty' )
      },
      massNumber: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_massNumber_accessibleName', _.get( BuildAnAtomStrings, 'a11y.atomScreen.massNumber.accessibleNameStringProperty' ) ),
        accessibleParagraphStringProperty: _.get( BuildAnAtomStrings, 'a11y.atomScreen.massNumber.accessibleParagraphStringProperty' )
      }
    },
    symbolScreen: {
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_symbolScreen_screenSummary_playArea', _.get( BuildAnAtomStrings, 'a11y.symbolScreen.screenSummary.playAreaStringProperty' ) )
      },
      screenIcon: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_symbolScreen_screenIcon_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.symbolScreen.screenIcon.accessibleHelpTextStringProperty' ) )
      },
      symbol: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_symbolScreen_symbol_accessibleName', _.get( BuildAnAtomStrings, 'a11y.symbolScreen.symbol.accessibleNameStringProperty' ) ),
        noSymbolStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_symbolScreen_symbol_noSymbol', _.get( BuildAnAtomStrings, 'a11y.symbolScreen.symbol.noSymbolStringProperty' ) ),
        accessibleListNode: {
          symbolStringProperty: _.get( BuildAnAtomStrings, 'a11y.symbolScreen.symbol.accessibleListNode.symbolStringProperty' ),
          atomicNumberStringProperty: _.get( BuildAnAtomStrings, 'a11y.symbolScreen.symbol.accessibleListNode.atomicNumberStringProperty' ),
          massNumberStringProperty: _.get( BuildAnAtomStrings, 'a11y.symbolScreen.symbol.accessibleListNode.massNumberStringProperty' ),
          chargeStringProperty: _.get( BuildAnAtomStrings, 'a11y.symbolScreen.symbol.accessibleListNode.chargeStringProperty' )
        }
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
