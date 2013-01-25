Hebrew Lexicon
	1/14/2013

The Hebrew Mesh has fulfilled its purpose, to maintain a viable Hebrew
lexicon, until the Brown, Driver Briggs section was complete enough
to stand on its own.  The Hebrew Lexicon is now taking on a new form.
Initially, it is comprised of three separate files:

1. BrownDriverBriggs.xml contains the current BDB content.  It remains
a work in progress.  Entries will be filled out over time, especially
in the area of completing the scripture references, and Hebrew words.

2. HebrewStrong.xml contains the content for Strong's Hebrew Dictionary.
Numerous corrections have been made, since the initial offering, in a
significantly different format.  The layout now follows the Hebrew Mesh,
with duplicated entries recombined.

3. LexicalIndex.xml is now the meeting place of BDB, Strong and the
TWOT numbers, again significantly improved from the original Strong's
Dictionary, and incorporating corrections that have arisen in the
process of constructing the new lexicon.

The lexical index is meant to bridge the gap between the accessibility
and ubiquity of Strong's Dictionary, and the comprehensiveness and
accuracy of BDB.  For those versed in Hebrew, and wanting the depth of
BDB, it can now be accessed on its own terms.  For those more familiar
with Strong numbers, or having current applications based on them, the
lexical index provides access directly to entries via the Strong numbers.

The main function of the lexical index is as a lookup table for the
other data.  My goal, however, was to make it a little more informative.
In general, the entries will have:

an id attribute: This is mainly intended for internal use.  It is not my
intent to promote a new "Strong number".

a <w> element: This contains the main entry word, and an xlit attribute
with its transliteration.  Words were selected by comparing the main
entry words in BDB and Strong's.  Transliterations are in SBL format:
http://www.viceregency.com/Translit.htm

an optional <pos> element, giving the part of speech.  These were also
derived from a comparsion of BDB and Strong's, simplified to give a
single listing.  They follow Hebrew Morphology Codes:
http://openscriptures.github.com/morphhb/parsing/HebrewMorphologyCodes.html

an optional <def> element, giving a simple definition.  This is generally
the main BDB definition, except in the case of proper names, where the
King James rendering from Strong's is used, since BDB expects you to be
able to read the Hebrew.

an <xref> element, for cross references.  This will have attributes for:
	bdb: where there is a corresponding BDB entry,
	strong: where there is a corresponding Strong's entry,
	aug: where the Strong entry maps to more than one BDB entry,
	twot: where there is a corresponding TWOT entry.

an optional <etym> element, to record etymology information.  This will
contain a type attribute, indicating:
	main: that this is a main entry, and will list its sub-entries,
	sub: that this is a sub-entry, and will list its main entry,
	single: that this is a single entry, open to further clarification,
	check: that its status is uncertain.
It may also contain a root attribute, listing the consonantal root.

The idea behind the etymology element is mainly to form word groups, to
compare meanings of related words.  The root has been added to aid in
parsing.  Root listings in the old Hebrew Mesh were based on the
structure of the BDB Outline, at the beginning of this project.  Their
accuracy was less than ideal.  With the lexical index, I have taken a
much more conservative approach.  The roots and etymologies listed
should be accurate, though there is room for extension.

This initial release lacks all ancillary files: schemas, sample XSLT
transforms, etc.  My main thought for display is to form word groups,
with the lexical index data, for quick recognition.  Then to include
links, using the xref fields, to access the content, for any given
entry.

From this point on, Hebrew Mesh is essentially retired.  Though, of
course, it may take some time to update even my own software to use
the new approach.  Minor corrections may be made, as I come across
them, during the transition.

One note on BrownDriverBriggs: the IDs have been completely redone,
in over 500 places, to represent more accurately the structure of BDB.
Any application based on these will require updating.  The <status>
element has been maintained, including the page number.  These refer
to the original, available at
http://en.wikisource.org/wiki/Index:A_Hebrew_and_English_Lexicon_%28Brown-Driver-Briggs%29.djvu
Status values are:
	done: all the BDB content,
	ref: complete scripture references,
	base: enough to make a viable lexicon,
	made: for reconstructed cross-reference entries,
	new: for BDB main entries not found in Strong's,
	added: for similar roots discussed in the body of a BDB entry.

TWOT numbers are included for reference purposes.  We are in no way
directly transcribing the Theological Wordbook of the Old Testament.

Thanks to Daniel Owens, for much help, especially in transcribing the
main entries, not listed in Strong's.
