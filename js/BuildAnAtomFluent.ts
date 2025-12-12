// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from build-an-atom-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import {TReadOnlyProperty} from '../../axon/js/TReadOnlyProperty.js';
import FluentComment from '../../chipper/js/browser/FluentComment.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import type {FluentVariable} from '../../chipper/js/browser/FluentPattern.js';
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
addToMapIfDefined( 'chooseYourGame', 'chooseYourGameStringProperty' );
addToMapIfDefined( 'gamesInfoTitle', 'gamesInfoTitleStringProperty' );
addToMapIfDefined( 'chargeNotation', 'chargeNotationStringProperty' );
addToMapIfDefined( 'keyboardHelpContent_particleNavigationHeading', 'keyboardHelpContent.particleNavigationHeadingStringProperty' );
addToMapIfDefined( 'keyboardHelpContent_grabOrRelease', 'keyboardHelpContent.grabOrReleaseStringProperty' );
addToMapIfDefined( 'keyboardHelpContent_selectParticleInAtom', 'keyboardHelpContent.selectParticleInAtomStringProperty' );
addToMapIfDefined( 'keyboardHelpContent_moveGrabbedParticle', 'keyboardHelpContent.moveGrabbedParticleStringProperty' );
addToMapIfDefined( 'keyboardHelpContent_returnToBucket', 'keyboardHelpContent.returnToBucketStringProperty' );
addToMapIfDefined( 'keyboardHelpContent_cancelMovement', 'keyboardHelpContent.cancelMovementStringProperty' );
addToMapIfDefined( 'preferences_chargeNotationSelectorLabel', 'preferences.chargeNotationSelectorLabelStringProperty' );
addToMapIfDefined( 'a11y_common_particles_particleAddedTo', 'a11y.common.particles.particleAddedToStringProperty' );
addToMapIfDefined( 'a11y_common_particles_particleReturnedToBucket', 'a11y.common.particles.particleReturnedToBucketStringProperty' );
addToMapIfDefined( 'a11y_common_buckets_bucketEmpty', 'a11y.common.buckets.bucketEmptyStringProperty' );
addToMapIfDefined( 'a11y_common_buckets_emptyHelpText', 'a11y.common.buckets.emptyHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_buckets_accessibleHeading', 'a11y.common.buckets.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_common_buckets_accessibleHelpText', 'a11y.common.buckets.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_atomStateLeadingParagraph', 'a11y.common.atomAccessibleListNode.atomStateLeadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_checkboxesListLeadingParagraph', 'a11y.common.atomAccessibleListNode.checkboxesListLeadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_accessibleHeading', 'a11y.common.atomAccessibleListNode.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_builtAtom', 'a11y.common.atomAccessibleListNode.builtAtomStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_nucleusInfoFull', 'a11y.common.atomAccessibleListNode.nucleusInfoFullStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_nucleusInfoProtons', 'a11y.common.atomAccessibleListNode.nucleusInfoProtonsStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_nucleusInfoNeutrons', 'a11y.common.atomAccessibleListNode.nucleusInfoNeutronsStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_nucleusInfoEmpty', 'a11y.common.atomAccessibleListNode.nucleusInfoEmptyStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_shellInfoFull', 'a11y.common.atomAccessibleListNode.shellInfoFullStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_cloudInfoFull', 'a11y.common.atomAccessibleListNode.cloudInfoFullStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_shellInfoEmpty', 'a11y.common.atomAccessibleListNode.shellInfoEmptyStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_cloudInfoEmpty', 'a11y.common.atomAccessibleListNode.cloudInfoEmptyStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_accessibleParagraph', 'a11y.common.atomAccessibleListNode.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_nucleusContains', 'a11y.common.atomAccessibleListNode.nucleusContainsStringProperty' );
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
addToMapIfDefined( 'a11y_common_screenSummary_controlArea', 'a11y.common.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_common_screenSummary_currentDetails', 'a11y.common.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_common_screenSummary_interactionHint', 'a11y.common.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_screenSummary_playArea', 'a11y.atomScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_screenIcon_accessibleHelpText', 'a11y.atomScreen.screenIcon.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_netCharge_accessibleName', 'a11y.atomScreen.netCharge.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_netCharge_accessibleParagraph', 'a11y.atomScreen.netCharge.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_atomScreen_massNumber_accessibleName', 'a11y.atomScreen.massNumber.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_symbolScreen_screenSummary_playArea', 'a11y.symbolScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_symbolScreen_screenIcon_accessibleHelpText', 'a11y.symbolScreen.screenIcon.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_symbolScreen_symbol_leadingParagraph', 'a11y.symbolScreen.symbol.leadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_symbolScreen_symbol_accessibleName', 'a11y.symbolScreen.symbol.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_symbolScreen_symbol_noSymbol', 'a11y.symbolScreen.symbol.noSymbolStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_screenIcon_accessibleHelpText', 'a11y.gameScreen.screenIcon.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_gameButtons_level1AccessibleHelpText', 'a11y.gameScreen.gameButtons.level1AccessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_gameButtons_level2AccessibleHelpText', 'a11y.gameScreen.gameButtons.level2AccessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_gameButtons_level3AccessibleHelpText', 'a11y.gameScreen.gameButtons.level3AccessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_gameButtons_level4AccessibleHelpText', 'a11y.gameScreen.gameButtons.level4AccessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_periodicTable_accessibleName', 'a11y.gameScreen.components.periodicTable.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_periodicTable_accessibleHelpText', 'a11y.gameScreen.components.periodicTable.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_periodicTable_cellAriaDescription', 'a11y.gameScreen.components.periodicTable.cellAriaDescriptionStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_periodicTable_accessibleParagraph', 'a11y.gameScreen.components.periodicTable.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_accessibleName', 'a11y.gameScreen.components.chemicalSymbol.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_accessibleHelpText', 'a11y.gameScreen.components.chemicalSymbol.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_upperLeft_accessibleName', 'a11y.gameScreen.components.chemicalSymbol.upperLeft.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_upperLeft_accessibleHelpText', 'a11y.gameScreen.components.chemicalSymbol.upperLeft.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_upperRight_accessibleName', 'a11y.gameScreen.components.chemicalSymbol.upperRight.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_upperRight_accessibleHelpText', 'a11y.gameScreen.components.chemicalSymbol.upperRight.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_lowerLeft_accessibleName', 'a11y.gameScreen.components.chemicalSymbol.lowerLeft.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_lowerLeft_accessibleHelpText', 'a11y.gameScreen.components.chemicalSymbol.lowerLeft.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_accessibleListNode_leadingParagraph', 'a11y.gameScreen.components.chemicalSymbol.accessibleListNode.leadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_accessibleListNode_name', 'a11y.gameScreen.components.chemicalSymbol.accessibleListNode.nameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_accessibleListNode_symbol', 'a11y.gameScreen.components.chemicalSymbol.accessibleListNode.symbolStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_accessibleListNode_atomicNumber', 'a11y.gameScreen.components.chemicalSymbol.accessibleListNode.atomicNumberStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_accessibleListNode_massNumber', 'a11y.gameScreen.components.chemicalSymbol.accessibleListNode.massNumberStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_accessibleListNode_charge', 'a11y.gameScreen.components.chemicalSymbol.accessibleListNode.chargeStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_checkButton_accessibleContextResponses_correctFirstTry', 'a11y.gameScreen.components.checkButton.accessibleContextResponses.correctFirstTryStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_checkButton_accessibleContextResponses_correctSecondTry', 'a11y.gameScreen.components.checkButton.accessibleContextResponses.correctSecondTryStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_checkButton_accessibleContextResponses_incorrectFirstTry', 'a11y.gameScreen.components.checkButton.accessibleContextResponses.incorrectFirstTryStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_checkButton_accessibleContextResponses_incorrectSecondTry', 'a11y.gameScreen.components.checkButton.accessibleContextResponses.incorrectSecondTryStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToElement_accessibleHeading', 'a11y.gameScreen.challenges.countsToElement.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToElement_accessibleParagraph', 'a11y.gameScreen.challenges.countsToElement.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToElement_correctAnswerParagraph', 'a11y.gameScreen.challenges.countsToElement.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToCharge_accessibleParagraph', 'a11y.gameScreen.challenges.countsToCharge.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToCharge_correctAnswerParagraph', 'a11y.gameScreen.challenges.countsToCharge.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToCharge_accessibleName', 'a11y.gameScreen.challenges.countsToCharge.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToCharge_accessibleHelpText', 'a11y.gameScreen.challenges.countsToCharge.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToMassNumber_accessibleParagraph', 'a11y.gameScreen.challenges.countsToMassNumber.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToMassNumber_correctAnswerParagraph', 'a11y.gameScreen.challenges.countsToMassNumber.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToMassNumber_accessibleName', 'a11y.gameScreen.challenges.countsToMassNumber.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToMassNumber_accessibleHelpText', 'a11y.gameScreen.challenges.countsToMassNumber.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToSymbolAll_accessibleParagraph', 'a11y.gameScreen.challenges.countsToSymbolAll.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToSymbolAll_correctAnswerParagraph', 'a11y.gameScreen.challenges.countsToSymbolAll.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToSymbolCharge_accessibleParagraph', 'a11y.gameScreen.challenges.countsToSymbolCharge.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToSymbolCharge_correctAnswerParagraph', 'a11y.gameScreen.challenges.countsToSymbolCharge.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToSymbolMassNumber_accessibleParagraph', 'a11y.gameScreen.challenges.countsToSymbolMassNumber.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToSymbolMassNumber_correctAnswerParagraph', 'a11y.gameScreen.challenges.countsToSymbolMassNumber.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_schematicToElement_accessibleParagraph', 'a11y.gameScreen.challenges.schematicToElement.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_schematicToElement_correctAnswerParagraph', 'a11y.gameScreen.challenges.schematicToElement.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_schematicToCharge_accessibleParagraph', 'a11y.gameScreen.challenges.schematicToCharge.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_schematicToCharge_correctAnswerParagraph', 'a11y.gameScreen.challenges.schematicToCharge.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_schematicToMassNumber_accessibleParagraph', 'a11y.gameScreen.challenges.schematicToMassNumber.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_schematicToMassNumber_correctAnswerParagraph', 'a11y.gameScreen.challenges.schematicToMassNumber.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_schematicToSymbolAll_accessibleParagraph', 'a11y.gameScreen.challenges.schematicToSymbolAll.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_schematicToSymbolAll_correctAnswerParagraph', 'a11y.gameScreen.challenges.schematicToSymbolAll.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_schematicToSymbolCharge_accessibleParagraph', 'a11y.gameScreen.challenges.schematicToSymbolCharge.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_schematicToSymbolCharge_correctAnswerParagraph', 'a11y.gameScreen.challenges.schematicToSymbolCharge.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_schematicToSymbolMassNumber_accessibleParagraph', 'a11y.gameScreen.challenges.schematicToSymbolMassNumber.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_schematicToSymbolMassNumber_correctAnswerParagraph', 'a11y.gameScreen.challenges.schematicToSymbolMassNumber.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_schematicToSymbolProtonCount_accessibleParagraph', 'a11y.gameScreen.challenges.schematicToSymbolProtonCount.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_schematicToSymbolProtonCount_correctAnswerParagraph', 'a11y.gameScreen.challenges.schematicToSymbolProtonCount.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_countsToSymbol_accessibleParagraph', 'a11y.gameScreen.challenges.countsToSymbol.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_symbolToCounts_accessibleParagraph', 'a11y.gameScreen.challenges.symbolToCounts.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_symbolToCounts_correctAnswerParagraph', 'a11y.gameScreen.challenges.symbolToCounts.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_symbolToCounts_accessibleHelpText', 'a11y.gameScreen.challenges.symbolToCounts.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_symbolToSchematic_accessibleParagraph', 'a11y.gameScreen.challenges.symbolToSchematic.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_symbolToSchematic_correctAnswerParagraph', 'a11y.gameScreen.challenges.symbolToSchematic.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_symbolToSchematic_accessibleHelpText', 'a11y.gameScreen.challenges.symbolToSchematic.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_symbolToSchematic_builtAtomHelpText', 'a11y.gameScreen.challenges.symbolToSchematic.builtAtomHelpTextStringProperty' );
addToMapIfDefined( 'a11y_preferences_signFirst_accessibleName', 'a11y.preferences.signFirst.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_preferences_signLast_accessibleName', 'a11y.preferences.signLast.accessibleNameStringProperty' );

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
  chooseYourGameStringProperty: _.get( BuildAnAtomStrings, 'chooseYourGameStringProperty' ),
  gamesInfoTitleStringProperty: _.get( BuildAnAtomStrings, 'gamesInfoTitleStringProperty' ),
  chargeNotationStringProperty: _.get( BuildAnAtomStrings, 'chargeNotationStringProperty' ),
  level1DescriptionPatternStringProperty: _.get( BuildAnAtomStrings, 'level1DescriptionPatternStringProperty' ),
  level2DescriptionPatternStringProperty: _.get( BuildAnAtomStrings, 'level2DescriptionPatternStringProperty' ),
  level3DescriptionPatternStringProperty: _.get( BuildAnAtomStrings, 'level3DescriptionPatternStringProperty' ),
  level4DescriptionPatternStringProperty: _.get( BuildAnAtomStrings, 'level4DescriptionPatternStringProperty' ),
  keyboardHelpContent: {
    particleNavigationHeadingStringProperty: _.get( BuildAnAtomStrings, 'keyboardHelpContent.particleNavigationHeadingStringProperty' ),
    grabOrReleaseStringProperty: _.get( BuildAnAtomStrings, 'keyboardHelpContent.grabOrReleaseStringProperty' ),
    selectParticleInAtomStringProperty: _.get( BuildAnAtomStrings, 'keyboardHelpContent.selectParticleInAtomStringProperty' ),
    moveGrabbedParticleStringProperty: _.get( BuildAnAtomStrings, 'keyboardHelpContent.moveGrabbedParticleStringProperty' ),
    returnToBucketStringProperty: _.get( BuildAnAtomStrings, 'keyboardHelpContent.returnToBucketStringProperty' ),
    cancelMovementStringProperty: _.get( BuildAnAtomStrings, 'keyboardHelpContent.cancelMovementStringProperty' )
  },
  _comment_0: new FluentComment( {"comment":"Preferences","associatedKey":"preferences"} ),
  preferences: {
    chargeNotationSelectorLabelStringProperty: _.get( BuildAnAtomStrings, 'preferences.chargeNotationSelectorLabelStringProperty' )
  },
  a11y: {
    common: {
      particles: {
        particleAddedTo: new FluentPattern<{ count: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, location: FluentVariable, particle: FluentVariable, particles: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_particles_particleAddedTo', _.get( BuildAnAtomStrings, 'a11y.common.particles.particleAddedToStringProperty' ), [{"name":"count","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"location"},{"name":"particle"},{"name":"particles"}] ),
        particleReturnedToBucket: new FluentPattern<{ particle: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_particles_particleReturnedToBucket', _.get( BuildAnAtomStrings, 'a11y.common.particles.particleReturnedToBucketStringProperty' ), [{"name":"particle"}] )
      },
      buckets: {
        bucketEmptyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_buckets_bucketEmpty', _.get( BuildAnAtomStrings, 'a11y.common.buckets.bucketEmptyStringProperty' ) ),
        emptyHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_buckets_emptyHelpText', _.get( BuildAnAtomStrings, 'a11y.common.buckets.emptyHelpTextStringProperty' ) ),
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_buckets_accessibleHeading', _.get( BuildAnAtomStrings, 'a11y.common.buckets.accessibleHeadingStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_buckets_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.common.buckets.accessibleHelpTextStringProperty' ) )
      },
      atomAccessibleListNode: {
        atomStateLeadingParagraph: new FluentPattern<{ model: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_atomStateLeadingParagraph', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.atomStateLeadingParagraphStringProperty' ), [{"name":"model"}] ),
        checkboxesListLeadingParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_checkboxesListLeadingParagraph', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.checkboxesListLeadingParagraphStringProperty' ) ),
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_accessibleHeading', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.accessibleHeadingStringProperty' ) ),
        builtAtomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_builtAtom', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.builtAtomStringProperty' ) ),
        nucleusInfoFull: new FluentPattern<{ neutrons: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, protons: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_nucleusInfoFull', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.nucleusInfoFullStringProperty' ), [{"name":"neutrons","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"protons","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        nucleusInfoProtons: new FluentPattern<{ protons: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_nucleusInfoProtons', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.nucleusInfoProtonsStringProperty' ), [{"name":"protons","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        nucleusInfoNeutrons: new FluentPattern<{ neutrons: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_nucleusInfoNeutrons', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.nucleusInfoNeutronsStringProperty' ), [{"name":"neutrons","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        nucleusInfoEmptyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_nucleusInfoEmpty', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.nucleusInfoEmptyStringProperty' ) ),
        shellInfoFull: new FluentPattern<{ inner: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, outer: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_shellInfoFull', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.shellInfoFullStringProperty' ), [{"name":"inner","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"outer","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        cloudInfoFull: new FluentPattern<{ value: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_cloudInfoFull', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.cloudInfoFullStringProperty' ), [{"name":"value","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        shellInfoEmptyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_shellInfoEmpty', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.shellInfoEmptyStringProperty' ) ),
        cloudInfoEmptyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_cloudInfoEmpty', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.cloudInfoEmptyStringProperty' ) ),
        accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.accessibleParagraphStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"Description of the particles in the nucleus, with different forms","associatedKey":"nucleusContains"} ),
        _comment_1: new FluentComment( {"comment":"depending on which particles are present.","associatedKey":"nucleusContains"} ),
        _comment_2: new FluentComment( {"comment":"full - both protons and neutrons present","associatedKey":"nucleusContains"} ),
        _comment_3: new FluentComment( {"comment":"protons - only protons present","associatedKey":"nucleusContains"} ),
        _comment_4: new FluentComment( {"comment":"neutrons - only neutrons present","associatedKey":"nucleusContains"} ),
        _comment_5: new FluentComment( {"comment":"empty - neither present","associatedKey":"nucleusContains"} ),
        nucleusContains: new FluentPattern<{ neutrons: number | 'one' | number | 'other' | number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other' | number | 'one' | number | 'other'>, nucleonState: 'full' | 'protons' | 'neutrons' | 'empty' | TReadOnlyProperty<'full' | 'protons' | 'neutrons' | 'empty'>, protons: number | 'one' | number | 'other' | number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other' | number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_nucleusContains', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.nucleusContainsStringProperty' ), [{"name":"neutrons","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"},{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"nucleonState","variants":["full","protons","neutrons","empty"]},{"name":"protons","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"},{"type":"number","value":"one"},{"type":"number","value":"other"}]}] )
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
        accessibleParagraphHighlightedWithNameStringProperty: _.get( BuildAnAtomStrings, 'a11y.common.periodicTable.accessibleParagraphHighlightedWithNameStringProperty' ),
        accessibleParagraphNoSymbolStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_periodicTable_accessibleParagraphNoSymbol', _.get( BuildAnAtomStrings, 'a11y.common.periodicTable.accessibleParagraphNoSymbolStringProperty' ) )
      },
      screenSummary: {
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_screenSummary_controlArea', _.get( BuildAnAtomStrings, 'a11y.common.screenSummary.controlAreaStringProperty' ) ),
        currentDetails: new FluentPattern<{ value: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_common_screenSummary_currentDetails', _.get( BuildAnAtomStrings, 'a11y.common.screenSummary.currentDetailsStringProperty' ), [{"name":"value","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_screenSummary_interactionHint', _.get( BuildAnAtomStrings, 'a11y.common.screenSummary.interactionHintStringProperty' ) )
      }
    },
    atomScreen: {
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_screenSummary_playArea', _.get( BuildAnAtomStrings, 'a11y.atomScreen.screenSummary.playAreaStringProperty' ) )
      },
      screenIcon: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_screenIcon_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.atomScreen.screenIcon.accessibleHelpTextStringProperty' ) )
      },
      netCharge: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomScreen_netCharge_accessibleName', _.get( BuildAnAtomStrings, 'a11y.atomScreen.netCharge.accessibleNameStringProperty' ) ),
        accessibleParagraph: new FluentPattern<{ charge: FluentVariable, electrons: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, protons: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_atomScreen_netCharge_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.atomScreen.netCharge.accessibleParagraphStringProperty' ), [{"name":"charge"},{"name":"electrons","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"protons","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] )
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
        leadingParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_symbolScreen_symbol_leadingParagraph', _.get( BuildAnAtomStrings, 'a11y.symbolScreen.symbol.leadingParagraphStringProperty' ) ),
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
      },
      gameButtons: {
        level1AccessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_gameButtons_level1AccessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.gameButtons.level1AccessibleHelpTextStringProperty' ) ),
        level2AccessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_gameButtons_level2AccessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.gameButtons.level2AccessibleHelpTextStringProperty' ) ),
        level3AccessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_gameButtons_level3AccessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.gameButtons.level3AccessibleHelpTextStringProperty' ) ),
        level4AccessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_gameButtons_level4AccessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.gameButtons.level4AccessibleHelpTextStringProperty' ) )
      },
      components: {
        periodicTable: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_periodicTable_accessibleName', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.periodicTable.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_periodicTable_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.periodicTable.accessibleHelpTextStringProperty' ) ),
          cellAriaDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_periodicTable_cellAriaDescription', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.periodicTable.cellAriaDescriptionStringProperty' ) ),
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_periodicTable_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.periodicTable.accessibleParagraphStringProperty' ) )
        },
        chemicalSymbol: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_accessibleName', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.accessibleHelpTextStringProperty' ) ),
          upperLeft: {
            accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_upperLeft_accessibleName', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.upperLeft.accessibleNameStringProperty' ) ),
            accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_upperLeft_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.upperLeft.accessibleHelpTextStringProperty' ) )
          },
          upperRight: {
            accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_upperRight_accessibleName', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.upperRight.accessibleNameStringProperty' ) ),
            accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_upperRight_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.upperRight.accessibleHelpTextStringProperty' ) )
          },
          lowerLeft: {
            accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_lowerLeft_accessibleName', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.lowerLeft.accessibleNameStringProperty' ) ),
            accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_lowerLeft_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.lowerLeft.accessibleHelpTextStringProperty' ) )
          },
          accessibleListNode: {
            leadingParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_accessibleListNode_leadingParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.accessibleListNode.leadingParagraphStringProperty' ) ),
            name: new FluentPattern<{ name: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_accessibleListNode_name', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.accessibleListNode.nameStringProperty' ), [{"name":"name"}] ),
            symbol: new FluentPattern<{ symbol: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_accessibleListNode_symbol', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.accessibleListNode.symbolStringProperty' ), [{"name":"symbol"}] ),
            atomicNumber: new FluentPattern<{ protons: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_accessibleListNode_atomicNumber', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.accessibleListNode.atomicNumberStringProperty' ), [{"name":"protons"}] ),
            massNumber: new FluentPattern<{ mass: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_accessibleListNode_massNumber', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.accessibleListNode.massNumberStringProperty' ), [{"name":"mass"}] ),
            charge: new FluentPattern<{ charge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_accessibleListNode_charge', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.accessibleListNode.chargeStringProperty' ), [{"name":"charge"}] )
          }
        },
        checkButton: {
          accessibleContextResponses: {
            correctFirstTryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_checkButton_accessibleContextResponses_correctFirstTry', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.checkButton.accessibleContextResponses.correctFirstTryStringProperty' ) ),
            correctSecondTryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_checkButton_accessibleContextResponses_correctSecondTry', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.checkButton.accessibleContextResponses.correctSecondTryStringProperty' ) ),
            incorrectFirstTryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_checkButton_accessibleContextResponses_incorrectFirstTry', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.checkButton.accessibleContextResponses.incorrectFirstTryStringProperty' ) ),
            incorrectSecondTryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_checkButton_accessibleContextResponses_incorrectSecondTry', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.checkButton.accessibleContextResponses.incorrectSecondTryStringProperty' ) )
          }
        }
      },
      challenges: {
        countsToElement: {
          accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToElement_accessibleHeading', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToElement.accessibleHeadingStringProperty' ) ),
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToElement_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToElement.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ neutralOrIon: FluentVariable, symbol: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToElement_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToElement.correctAnswerParagraphStringProperty' ), [{"name":"neutralOrIon"},{"name":"symbol"}] )
        },
        countsToCharge: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToCharge_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToCharge.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ charge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToCharge_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToCharge.correctAnswerParagraphStringProperty' ), [{"name":"charge"}] ),
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToCharge_accessibleName', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToCharge.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToCharge_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToCharge.accessibleHelpTextStringProperty' ) )
        },
        countsToMassNumber: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToMassNumber_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToMassNumber.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ mass: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToMassNumber_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToMassNumber.correctAnswerParagraphStringProperty' ), [{"name":"mass"}] ),
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToMassNumber_accessibleName', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToMassNumber.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToMassNumber_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToMassNumber.accessibleHelpTextStringProperty' ) )
        },
        countsToSymbolAll: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToSymbolAll_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToSymbolAll.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ charge: FluentVariable, mass: FluentVariable, name: FluentVariable, protons: FluentVariable, symbol: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToSymbolAll_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToSymbolAll.correctAnswerParagraphStringProperty' ), [{"name":"charge"},{"name":"mass"},{"name":"name"},{"name":"protons"},{"name":"symbol"}] )
        },
        countsToSymbolCharge: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToSymbolCharge_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToSymbolCharge.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ charge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToSymbolCharge_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToSymbolCharge.correctAnswerParagraphStringProperty' ), [{"name":"charge"}] )
        },
        countsToSymbolMassNumber: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToSymbolMassNumber_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToSymbolMassNumber.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ mass: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToSymbolMassNumber_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToSymbolMassNumber.correctAnswerParagraphStringProperty' ), [{"name":"mass"}] )
        },
        schematicToElement: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_schematicToElement_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.schematicToElement.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ neutralOrIon: FluentVariable, symbol: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_schematicToElement_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.schematicToElement.correctAnswerParagraphStringProperty' ), [{"name":"neutralOrIon"},{"name":"symbol"}] )
        },
        schematicToCharge: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_schematicToCharge_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.schematicToCharge.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ charge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_schematicToCharge_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.schematicToCharge.correctAnswerParagraphStringProperty' ), [{"name":"charge"}] )
        },
        schematicToMassNumber: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_schematicToMassNumber_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.schematicToMassNumber.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ mass: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_schematicToMassNumber_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.schematicToMassNumber.correctAnswerParagraphStringProperty' ), [{"name":"mass"}] )
        },
        schematicToSymbolAll: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_schematicToSymbolAll_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.schematicToSymbolAll.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ charge: FluentVariable, mass: FluentVariable, name: FluentVariable, protons: FluentVariable, symbol: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_schematicToSymbolAll_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.schematicToSymbolAll.correctAnswerParagraphStringProperty' ), [{"name":"charge"},{"name":"mass"},{"name":"name"},{"name":"protons"},{"name":"symbol"}] )
        },
        schematicToSymbolCharge: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_schematicToSymbolCharge_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.schematicToSymbolCharge.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ charge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_schematicToSymbolCharge_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.schematicToSymbolCharge.correctAnswerParagraphStringProperty' ), [{"name":"charge"}] )
        },
        schematicToSymbolMassNumber: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_schematicToSymbolMassNumber_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.schematicToSymbolMassNumber.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ mass: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_schematicToSymbolMassNumber_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.schematicToSymbolMassNumber.correctAnswerParagraphStringProperty' ), [{"name":"mass"}] )
        },
        schematicToSymbolProtonCount: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_schematicToSymbolProtonCount_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.schematicToSymbolProtonCount.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ protons: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_schematicToSymbolProtonCount_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.schematicToSymbolProtonCount.correctAnswerParagraphStringProperty' ), [{"name":"protons"}] )
        },
        countsToSymbol: {
          accessibleParagraph: new FluentPattern<{ config: 'all' | 'charge' | 'massNumber' | TReadOnlyProperty<'all' | 'charge' | 'massNumber'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_countsToSymbol_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.countsToSymbol.accessibleParagraphStringProperty' ), [{"name":"config","variants":["all","charge","massNumber"]}] )
        },
        symbolToCounts: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_symbolToCounts_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.symbolToCounts.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ electrons: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, neutrons: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, protons: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_symbolToCounts_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.symbolToCounts.correctAnswerParagraphStringProperty' ), [{"name":"electrons","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"neutrons","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"protons","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_symbolToCounts_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.symbolToCounts.accessibleHelpTextStringProperty' ) )
        },
        symbolToSchematic: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_symbolToSchematic_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.symbolToSchematic.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ inner: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, neutrons: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, outer: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, protons: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_symbolToSchematic_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.symbolToSchematic.correctAnswerParagraphStringProperty' ), [{"name":"inner","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"neutrons","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"outer","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"protons","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_symbolToSchematic_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.symbolToSchematic.accessibleHelpTextStringProperty' ) ),
          builtAtomHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_symbolToSchematic_builtAtomHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.symbolToSchematic.builtAtomHelpTextStringProperty' ) )
        }
      }
    },
    _comment_0: new FluentComment( {"comment":"Preferences","associatedKey":"preferences"} ),
    preferences: {
      signFirst: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_preferences_signFirst_accessibleName', _.get( BuildAnAtomStrings, 'a11y.preferences.signFirst.accessibleNameStringProperty' ) )
      },
      signLast: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_preferences_signLast_accessibleName', _.get( BuildAnAtomStrings, 'a11y.preferences.signLast.accessibleNameStringProperty' ) )
      }
    }
  }
};

export default BuildAnAtomFluent;

buildAnAtom.register('BuildAnAtomFluent', BuildAnAtomFluent);
