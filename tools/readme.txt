Branches
  syncToBlink - tools and copy of Blink devtools files, patched
  devtoolsApp - Web App wrapper around devtools front_end

Directories
  /tools - this directory, updated on branch syncToBlink
  /extension - updated by copyPatchedBlink.sh on branch syncToBlink and
    by buildDevtools.sh on branch devtoolsApp

patchBlink.sh  import stg patches from ./patches-stg to blink branch 'devtoolsExtended'
  No local effect, creates new Blink branch
copyPatchedBlink.sh export patches from blink and copy the patched devtools source
  Writes on local works space and commits result to branch syncToBlink
rebaseDevtoolsApp.sh build devtools and patch in the application wrapper.
  Rebases branch devtoolsApp on syncToBlink.
  uses buildDevtools.sh
