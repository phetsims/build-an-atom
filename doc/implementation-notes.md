# Build an Atom - Implementation Notes

This simulation was ported from a Java version, not started from scratch in HTML5.

The Java version of the simulation had two "flavors" - Build an Atom and Isotopes and Atomic Mass.  Isotopes and Atomic
Mass has been split into a separate simulation, and the code that is shared between the two is in a repository called
'shred'.

There are so many size relationships in this simulation that are not to scale that it was difficult to choose a scaling
unit.  One could choose something like femtometers, and then use appropriate diameter values for neutrons and protons,
but the electron diameter would need to be way off, and the overall atom diameter would be too.  Ultimately, the scale
that has been chosen is roughly pixels on the default size screen.  This was called "screen units" back in the
Java/Piccolo days.

There are two main ways of representing an atom in the model, one where it is represented only by a set of numbers for
each type of constituent particle, and one that contains and manages references to constituent particles.  The former is
called "NumberAtom" and the latter is "ParticleAtom".  These are both pretty pervasive in the code, particularly in the
game.

Both NumberAtom and ParticleAtom end up having a number of derived properties that are important to know, such as
charge, atomic number, and atomic mass.  The types themselves generally track this information and make it available in
the form of DerivedProperty.

The game is state driven, and the view code monitors the state and uses it to decide what to display to the user.