# Build an Atom - Implementation Notes

@author John Blanco

## Table of Contents

TODO

## Introduction

This document contains notes related to the implementation of the "Build an Atom" simulation. The intended audience
is developers who need to make changes or to leverage the code. Such a need may arise if new features are added, or if
bugs or usability issues are reported and need to be addressed. This document is intended to provide an overview of the
simulation's architecture, a sort of "forest for the trees" view. The devil is, of course, in the details, and the code
itself should be considered the "ground truth".

This simulation was ported from a Java version, not started from scratch in HTML5.

The Java version of this simulation had two "flavors" - "Build an Atom" and "Isotopes and Atomic Mass". "Isotopes and
Atomic Mass" has now been split into a separate simulation, and the code that is shared between the two is in a
repository named "shred".

The reader is encouraged to read the [model document](https://github.com/phetsims/build-an-atom/blob/main/doc/model.md) before proceeding if they haven't already done so.

## Overview

Build an Atom is a simulation that allows users to build atoms by adding protons, neutrons, and electrons to an atom
model and see where the atom they've create appears on the periodic table and what its chemical symbol look like. The
simulation includes a game mode where users are challenged to build specific atoms based on their elemental properties.

## General Considerations

There are so many size relationships in this simulation that are not to scale that it was difficult to choose a scaling
unit. One could choose something like femtometers, and then use appropriate diameter values for neutrons and protons,
but the electron diameter would need to be way off, and the overall atom diameter would be too. Ultimately, the scale
that has been chosen is roughly pixels on the default size screen. This was called "screen units" back in the
Java/Piccolo days.

In all the screens in this sim, there are two main ways of representing an atom in the model, one where it is
represented only by a set of numbers for each type of constituent particle (e.g. hydrogen is represented as having one
proton, zero neutrons, and one electron), and one that contains and manages references to constituent subatomic
particles. The former is called `NumberAtom` and the latter is `ParticleAtom`. These are both pretty pervasive in the
code, particularly in the game, and studying their usage is a good way to understand how the sim works.

Both `NumberAtom` and `ParticleAtom` end up having a number of derived properties that are important to know, such as
charge, atomic number, and atomic mass. The types themselves generally track this information and make it available in
the form of DerivedProperty instances.  These types are also instrumental to the PhET-iO implementation of the sim, as
they contain the state information and allow it to be set and queried via PhET-iO APIs.

## The "Atom" and "Symbol" Screens

The first two screens - the "Atom" screen and the "Symbol" screen - are fairly similar and share much of the same code.
The main difference is that the "Symbol" screen includes a symbol view that displays the chemical symbol of the atom
being built, while the "Atom" screen does not.  The model in these screens contains a single `ParticleAtom` instance
that is initially empty, and there are buckets of protons, neutrons, and electrons that the user can drag into the atom
to build it up.  The particles, buckets, and atom all exist in the model.

In the view code, the particles are represented by the `BAAParticleView` class, which represents each particle as a
colored, shaded circle. The particle view code includes drag and drop handling, and when a particle is dropped into the
atom view, the model is updated to add the particle to the atom. The atom tracks a number of properties, such as charge
and atomic number, and these are displayed in the info panels on the right side of the screens.

## Game Screen

The game is state driven, and the view code monitors the state and uses it to decide what to display to the user.  It
moves through state like "selecting level", "presenting challenge", "solved correctly", "try again", etc.  Looking at
these states and how the sim moves between them in the `GameModel` class is a good way to start to understand the flow
of the game.

The challenges and challenge views that are used in the game screen make extensive use of inheritance. To gain an
understanding of how the challenges work, it is recommended to start with the abstract base classes `BAAGameChallenge`
and `ChallengeView` and then look at the concrete subclasses that implement specific challenge.

The game screen uses a number of components from the common-code 'vegas' library.

## PhET-iO Implementation

In mid 2025 this sim was converted from JavaScript to TypeScript, and the phet-io implementation was updated such that
the sim could be used in the phet-io environment, specifically to run in PhET Studio.  This update had the most impact
on the Game screen.  This model portion of this screen was refactored such that things that were previously generated
dynamically, such as the challenges, were changed to all be created at startup and then reconfigured to present the
different challenges to the user.  Similar changes were made to the view code so it too could support state changes
without needing to create and destroy view elements.

## Alt-Input and Core Description

In late 2025, this sim was updated to support alt-input and core description. The alt-input code turned out to be fairly
complex due to a requirement where only one particle of each type is visible in the PDOM at a time, and only particles
in the atom are visible there, whereas particles in the buckets are not.  This required some careful management of the
PDOM visibility, focusability, and focus order of the particles as they are moved between the buckets and the atom.
Much of that code is in the `BAAParticleView` class, and studying that class is a good way to understand how alt-input
is implemented in this sim.

The core description implementation required the addition of many strings to the sim for screen reader users, and these
strings had to be dynamic so that they would update as the state of the sim changes.  Heavy use of Fluent was used in
the strings file to support these strings.  These strings are added to nodes in the scene graph using a11y-related
options such as `accessibleName`, `accessibleHelpText`, `accessibleParagraph`, etc.  A class was created with a set of
static methods to help generate these strings, called `AtomDescriberAccessibleListNode`.  This follows a pattern used
elsewhere in the PhET codebase for core description, which enables much of the string creation logic to be centralized
in one place.