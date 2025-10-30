// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from build-an-atom-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import { TReadOnlyProperty } from '../../axon/js/TReadOnlyProperty.js';
import type { FluentVariable } from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import FluentComment from '../../chipper/js/browser/FluentComment.js';
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
addToMapIfDefined( 'a11y_common_keyboardHelpContent_particleNavigationHeading', 'a11y.common.keyboardHelpContent.particleNavigationHeadingStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_grabOrRelease', 'a11y.common.keyboardHelpContent.grabOrReleaseStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_grabOrReleaseDescription', 'a11y.common.keyboardHelpContent.grabOrReleaseDescriptionStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_selectParticleInAtom', 'a11y.common.keyboardHelpContent.selectParticleInAtomStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_selectParticleInAtomDescription', 'a11y.common.keyboardHelpContent.selectParticleInAtomDescriptionStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_moveGrabbedParticle', 'a11y.common.keyboardHelpContent.moveGrabbedParticleStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_moveGrabbedParticleDescription', 'a11y.common.keyboardHelpContent.moveGrabbedParticleDescriptionStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_returnToBucket', 'a11y.common.keyboardHelpContent.returnToBucketStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_returnToBucketDescription', 'a11y.common.keyboardHelpContent.returnToBucketDescriptionStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_cancelMovement', 'a11y.common.keyboardHelpContent.cancelMovementStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_cancelMovementDescription', 'a11y.common.keyboardHelpContent.cancelMovementDescriptionStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_periodicTableHeading', 'a11y.common.keyboardHelpContent.periodicTableHeadingStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_navigateThroughTable', 'a11y.common.keyboardHelpContent.navigateThroughTableStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_navigateThroughTableDescription', 'a11y.common.keyboardHelpContent.navigateThroughTableDescriptionStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_selectChemicalSymbol', 'a11y.common.keyboardHelpContent.selectChemicalSymbolStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_selectChemicalSymbolDescription', 'a11y.common.keyboardHelpContent.selectChemicalSymbolDescriptionStringProperty' );
addToMapIfDefined( 'a11y_common_accordionAccessibleContextResponse_expanded', 'a11y.common.accordionAccessibleContextResponse.expandedStringProperty' );
addToMapIfDefined( 'a11y_common_accordionAccessibleContextResponse_collapsed', 'a11y.common.accordionAccessibleContextResponse.collapsedStringProperty' );
addToMapIfDefined( 'a11y_common_particles_accessibleHeading', 'a11y.common.particles.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_common_particles_particleAddedTo', 'a11y.common.particles.particleAddedToStringProperty' );
addToMapIfDefined( 'a11y_common_particles_overNucleus', 'a11y.common.particles.overNucleusStringProperty' );
addToMapIfDefined( 'a11y_common_particles_overInnerShell', 'a11y.common.particles.overInnerShellStringProperty' );
addToMapIfDefined( 'a11y_common_particles_overOuterShell', 'a11y.common.particles.overOuterShellStringProperty' );
addToMapIfDefined( 'a11y_common_particles_nearBuckets', 'a11y.common.particles.nearBucketsStringProperty' );
addToMapIfDefined( 'a11y_common_particles_overAtom', 'a11y.common.particles.overAtomStringProperty' );
addToMapIfDefined( 'a11y_common_particles_nucleus', 'a11y.common.particles.nucleusStringProperty' );
addToMapIfDefined( 'a11y_common_particles_innerShell', 'a11y.common.particles.innerShellStringProperty' );
addToMapIfDefined( 'a11y_common_particles_outerShell', 'a11y.common.particles.outerShellStringProperty' );
addToMapIfDefined( 'a11y_common_particles_cloud', 'a11y.common.particles.cloudStringProperty' );
addToMapIfDefined( 'a11y_common_particles_bucket', 'a11y.common.particles.bucketStringProperty' );
addToMapIfDefined( 'a11y_common_particles_particleReturnedToBucket', 'a11y.common.particles.particleReturnedToBucketStringProperty' );
addToMapIfDefined( 'a11y_common_particles_bucketEmpty', 'a11y.common.particles.bucketEmptyStringProperty' );
addToMapIfDefined( 'a11y_common_buckets_accessibleHeading', 'a11y.common.buckets.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_common_buckets_accessibleHelpText', 'a11y.common.buckets.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_atomStateLeadingParagraph', 'a11y.common.atomAccessibleListNode.atomStateLeadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_common_atomAccessibleListNode_checkboxesListLeadingParagraph', 'a11y.common.atomAccessibleListNode.checkboxesListLeadingParagraphStringProperty' );
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
addToMapIfDefined( 'a11y_gameScreen_components_periodicTable_objectResponse', 'a11y.gameScreen.components.periodicTable.objectResponseStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_periodicTable_accessibleParagraph', 'a11y.gameScreen.components.periodicTable.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_periodicTable_neutralAtom', 'a11y.gameScreen.components.periodicTable.neutralAtomStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_periodicTable_ion', 'a11y.gameScreen.components.periodicTable.ionStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_accessibleHelpText', 'a11y.gameScreen.components.chemicalSymbol.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_upperLeft_accessibleName', 'a11y.gameScreen.components.chemicalSymbol.upperLeft.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_upperLeft_accessibleHelpText', 'a11y.gameScreen.components.chemicalSymbol.upperLeft.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_upperRight_accessibleName', 'a11y.gameScreen.components.chemicalSymbol.upperRight.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_upperRight_accessibleHelpText', 'a11y.gameScreen.components.chemicalSymbol.upperRight.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_lowerLeft_accessibleName', 'a11y.gameScreen.components.chemicalSymbol.lowerLeft.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_lowerLeft_accessibleHelpText', 'a11y.gameScreen.components.chemicalSymbol.lowerLeft.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_checkButton_accessibleName', 'a11y.gameScreen.components.chemicalSymbol.checkButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_checkButton_accessibleContextResponses_correctFirstTry', 'a11y.gameScreen.components.chemicalSymbol.checkButton.accessibleContextResponses.correctFirstTryStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_checkButton_accessibleContextResponses_correctSecondTry', 'a11y.gameScreen.components.chemicalSymbol.checkButton.accessibleContextResponses.correctSecondTryStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_checkButton_accessibleContextResponses_incorrectFirstTry', 'a11y.gameScreen.components.chemicalSymbol.checkButton.accessibleContextResponses.incorrectFirstTryStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_components_chemicalSymbol_checkButton_accessibleContextResponses_incorrectSecondTry', 'a11y.gameScreen.components.chemicalSymbol.checkButton.accessibleContextResponses.incorrectSecondTryStringProperty' );
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
addToMapIfDefined( 'a11y_gameScreen_challenges_symbolToCounts_accessibleParagraph', 'a11y.gameScreen.challenges.symbolToCounts.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_symbolToCounts_correctAnswerParagraph', 'a11y.gameScreen.challenges.symbolToCounts.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_symbolToCounts_accessibleHelpText', 'a11y.gameScreen.challenges.symbolToCounts.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_symbolToSchematic_accessibleParagraph', 'a11y.gameScreen.challenges.symbolToSchematic.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_symbolToSchematic_correctAnswerParagraph', 'a11y.gameScreen.challenges.symbolToSchematic.correctAnswerParagraphStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_symbolToSchematic_accessibleHelpText', 'a11y.gameScreen.challenges.symbolToSchematic.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gameScreen_challenges_symbolToSchematic_builtAtomHelpText', 'a11y.gameScreen.challenges.symbolToSchematic.builtAtomHelpTextStringProperty' );

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
      keyboardHelpContent: {
        particleNavigationHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_particleNavigationHeading', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.particleNavigationHeadingStringProperty' ) ),
        grabOrReleaseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_grabOrRelease', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.grabOrReleaseStringProperty' ) ),
        grabOrReleaseDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_grabOrReleaseDescription', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.grabOrReleaseDescriptionStringProperty' ) ),
        selectParticleInAtomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_selectParticleInAtom', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.selectParticleInAtomStringProperty' ) ),
        selectParticleInAtomDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_selectParticleInAtomDescription', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.selectParticleInAtomDescriptionStringProperty' ) ),
        moveGrabbedParticleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_moveGrabbedParticle', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.moveGrabbedParticleStringProperty' ) ),
        moveGrabbedParticleDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_moveGrabbedParticleDescription', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.moveGrabbedParticleDescriptionStringProperty' ) ),
        returnToBucketStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_returnToBucket', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.returnToBucketStringProperty' ) ),
        returnToBucketDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_returnToBucketDescription', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.returnToBucketDescriptionStringProperty' ) ),
        cancelMovementStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_cancelMovement', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.cancelMovementStringProperty' ) ),
        cancelMovementDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_cancelMovementDescription', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.cancelMovementDescriptionStringProperty' ) ),
        periodicTableHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_periodicTableHeading', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.periodicTableHeadingStringProperty' ) ),
        navigateThroughTableStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_navigateThroughTable', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.navigateThroughTableStringProperty' ) ),
        navigateThroughTableDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_navigateThroughTableDescription', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.navigateThroughTableDescriptionStringProperty' ) ),
        selectChemicalSymbolStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_selectChemicalSymbol', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.selectChemicalSymbolStringProperty' ) ),
        selectChemicalSymbolDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_selectChemicalSymbolDescription', _.get( BuildAnAtomStrings, 'a11y.common.keyboardHelpContent.selectChemicalSymbolDescriptionStringProperty' ) )
      },
      accordionAccessibleContextResponse: {
        expandedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_accordionAccessibleContextResponse_expanded', _.get( BuildAnAtomStrings, 'a11y.common.accordionAccessibleContextResponse.expandedStringProperty' ) ),
        collapsedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_accordionAccessibleContextResponse_collapsed', _.get( BuildAnAtomStrings, 'a11y.common.accordionAccessibleContextResponse.collapsedStringProperty' ) )
      },
      particles: {
        _comment_0: new FluentComment( {"comment":"For Object Response","associatedKey":"accessibleHeading"} ),
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_particles_accessibleHeading', _.get( BuildAnAtomStrings, 'a11y.common.particles.accessibleHeadingStringProperty' ) ),
        particleAddedTo: new FluentPattern<{ count: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, location: FluentVariable, particle: FluentVariable, particles: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_particles_particleAddedTo', _.get( BuildAnAtomStrings, 'a11y.common.particles.particleAddedToStringProperty' ), [{"name":"count","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"location"},{"name":"particle"},{"name":"particles"}] ),
        accessibleNameStringProperty: _.get( BuildAnAtomStrings, 'a11y.common.particles.accessibleNameStringProperty' ),
        overNucleusStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_particles_overNucleus', _.get( BuildAnAtomStrings, 'a11y.common.particles.overNucleusStringProperty' ) ),
        overInnerShellStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_particles_overInnerShell', _.get( BuildAnAtomStrings, 'a11y.common.particles.overInnerShellStringProperty' ) ),
        overOuterShellStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_particles_overOuterShell', _.get( BuildAnAtomStrings, 'a11y.common.particles.overOuterShellStringProperty' ) ),
        nearBucketsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_particles_nearBuckets', _.get( BuildAnAtomStrings, 'a11y.common.particles.nearBucketsStringProperty' ) ),
        overAtomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_particles_overAtom', _.get( BuildAnAtomStrings, 'a11y.common.particles.overAtomStringProperty' ) ),
        nucleusStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_particles_nucleus', _.get( BuildAnAtomStrings, 'a11y.common.particles.nucleusStringProperty' ) ),
        innerShellStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_particles_innerShell', _.get( BuildAnAtomStrings, 'a11y.common.particles.innerShellStringProperty' ) ),
        outerShellStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_particles_outerShell', _.get( BuildAnAtomStrings, 'a11y.common.particles.outerShellStringProperty' ) ),
        cloudStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_particles_cloud', _.get( BuildAnAtomStrings, 'a11y.common.particles.cloudStringProperty' ) ),
        bucketStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_particles_bucket', _.get( BuildAnAtomStrings, 'a11y.common.particles.bucketStringProperty' ) ),
        particleReturnedToBucket: new FluentPattern<{ particle: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_particles_particleReturnedToBucket', _.get( BuildAnAtomStrings, 'a11y.common.particles.particleReturnedToBucketStringProperty' ), [{"name":"particle"}] ),
        bucketEmptyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_particles_bucketEmpty', _.get( BuildAnAtomStrings, 'a11y.common.particles.bucketEmptyStringProperty' ) )
      },
      buckets: {
        _comment_0: new FluentComment( {"comment":"For Object Response","associatedKey":"accessibleHeading"} ),
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_buckets_accessibleHeading', _.get( BuildAnAtomStrings, 'a11y.common.buckets.accessibleHeadingStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_buckets_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.common.buckets.accessibleHelpTextStringProperty' ) )
      },
      atomAccessibleListNode: {
        atomStateLeadingParagraph: new FluentPattern<{ model: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_atomStateLeadingParagraph', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.atomStateLeadingParagraphStringProperty' ), [{"name":"model"}] ),
        checkboxesListLeadingParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomAccessibleListNode_checkboxesListLeadingParagraph', _.get( BuildAnAtomStrings, 'a11y.common.atomAccessibleListNode.checkboxesListLeadingParagraphStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"For Object Response","associatedKey":"accessibleHeading"} ),
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
        accessibleParagraph: new FluentPattern<{ charge: FluentVariable, electrons: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, protons: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, sign: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_atomScreen_netCharge_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.atomScreen.netCharge.accessibleParagraphStringProperty' ), [{"name":"charge"},{"name":"electrons","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"protons","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"sign"}] )
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
          objectResponse: new FluentPattern<{ symbol: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_components_periodicTable_objectResponse', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.periodicTable.objectResponseStringProperty' ), [{"name":"symbol"}] ),
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_periodicTable_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.periodicTable.accessibleParagraphStringProperty' ) ),
          neutralAtomStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_periodicTable_neutralAtom', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.periodicTable.neutralAtomStringProperty' ) ),
          ionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_periodicTable_ion', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.periodicTable.ionStringProperty' ) )
        },
        chemicalSymbol: {
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
          checkButton: {
            accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_checkButton_accessibleName', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.checkButton.accessibleNameStringProperty' ) ),
            accessibleContextResponses: {
              correctFirstTryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_checkButton_accessibleContextResponses_correctFirstTry', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.checkButton.accessibleContextResponses.correctFirstTryStringProperty' ) ),
              correctSecondTryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_checkButton_accessibleContextResponses_correctSecondTry', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.checkButton.accessibleContextResponses.correctSecondTryStringProperty' ) ),
              incorrectFirstTryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_checkButton_accessibleContextResponses_incorrectFirstTry', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.checkButton.accessibleContextResponses.incorrectFirstTryStringProperty' ) ),
              incorrectSecondTryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_components_chemicalSymbol_checkButton_accessibleContextResponses_incorrectSecondTry', _.get( BuildAnAtomStrings, 'a11y.gameScreen.components.chemicalSymbol.checkButton.accessibleContextResponses.incorrectSecondTryStringProperty' ) )
            }
          }
        }
      },
      challenges: {
        countsToElement: {
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
        symbolToCounts: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_symbolToCounts_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.symbolToCounts.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ electrons: FluentVariable, neutrons: FluentVariable, protons: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_symbolToCounts_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.symbolToCounts.correctAnswerParagraphStringProperty' ), [{"name":"electrons"},{"name":"neutrons"},{"name":"protons"}] ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_symbolToCounts_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.symbolToCounts.accessibleHelpTextStringProperty' ) )
        },
        symbolToSchematic: {
          accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_symbolToSchematic_accessibleParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.symbolToSchematic.accessibleParagraphStringProperty' ) ),
          correctAnswerParagraph: new FluentPattern<{ inner: FluentVariable, neutrons: FluentVariable, outer: FluentVariable, protons: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_symbolToSchematic_correctAnswerParagraph', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.symbolToSchematic.correctAnswerParagraphStringProperty' ), [{"name":"inner"},{"name":"neutrons"},{"name":"outer"},{"name":"protons"}] ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_symbolToSchematic_accessibleHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.symbolToSchematic.accessibleHelpTextStringProperty' ) ),
          builtAtomHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gameScreen_challenges_symbolToSchematic_builtAtomHelpText', _.get( BuildAnAtomStrings, 'a11y.gameScreen.challenges.symbolToSchematic.builtAtomHelpTextStringProperty' ) )
        }
      }
    }
  }
};

export default BuildAnAtomFluent;

buildAnAtom.register('BuildAnAtomFluent', BuildAnAtomFluent);
