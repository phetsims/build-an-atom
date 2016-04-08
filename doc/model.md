# Build an Atom Model

This document describes the model for the Build an Atom simulation.<br>
@author John Blanco

In the Build an Atom simulation, atoms are constructed by users from protons, neutrons, and electrons.  Each of these
particles is modeled as a sphere of a specific color.  The particles, and the atoms that can be constructed from them,
are not at all to scale.  This was done to make it so that the particles could be easily seen and manipulated by the
users.  Protons and neutrons can only be placed in the nucleus, while electrons can only go in the outer shell of the
atom.  Trying to place protons or neutrons well outside the nucleus causes the particle to return to its bucket.
Attempts to place electrons well outside the orbitals will result in them returning to the bucket.  The chemical element
is determined by the number of protons in the nucleus.

There are ten protons provided to the user, which limits the atoms that can be constructed to the first two rows of
the periodic table.

Electrons will fill up the inner orbital first, which can hold a max of two electrons.  The outer orbital, which can
contain a maximum of eight electrons, fills up next. Attempts to remove inner electrons while outer electrons are
present will result in an outer electron moving to an inner shell.

By default, electrons are depicted as localized particles, but they can also be depicted in a more cloud like manner by
selecting the "Cloud" model setting.

The simulation does not enforce any rules about the construction of the atom.  For instance, it is possible to place
electrons in orbits without having anything in the nucleus, or to place more electrons in orbitals than would be 
possible for a given nucleus configuration.  It is also possible to create nucleus configurations that would essentially
decay immediately in real life.  This behavior was created intentionally to keep the simulation simple, and so that
students are not distracted by trying to determine which nuclear configurations are stable, or which electron 
configurations are realistic, since understanding these things are not learning goals of the simulation and could
potentially be distracting.  Stability of a nucleus can be seen by enabling the "Show Stable/Unstable" option, which
will cause nuclei to be labeled with "Stable" or "Unstable", and will cause unstable nuclei to move about randomly. 
This setting is off by default in order to minimize distraction.  Unstable nuclei do not break apart, i.e. nuclear decay
is not depicted.  A nucleus is considered stable if it has a half life greater than 10 billion years.
