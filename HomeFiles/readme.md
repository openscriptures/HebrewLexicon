#	The OSHB Lexicon App

Our Lexicon App is a basic prototype application, to demonstrate the
usage of the different parts of the lexicon, and their connection to
the lemma attributes of the OSHB text. The easiest way to use the app
in this form is to type one of those lemmas into the input box of the
lexicon app, and Enter.

1.	For example, if you look at Genesis 1:1, the first word has lemma
	b/7225. If you type this into the input box, the app will
	automatically choose the main word for you. The display should
	open up to the Lexical Index tab. It will show you the Word Group
	_reshiyth_ belongs to. At the top is the root word, then a list of
	words derived from that root, with _reshiyth_ checked. On the Brown,
	Driver, Briggs tab, you will find an abridged transcription of the
	BDB entry for that word. On the Strong’s Dictionary tab, you will
	find the corresponding entry from Strong’s Dictionary. You can use
	the radio buttons on the Lexical Index tab to look deeper into the
	context of the word in Hebrew.

2.	The b in b/7225 represents the prefix, _bet_ in Hebrew. If you want
	to look up the definition for that, just enter b in the input box.
	You will notice that Strong has no entry for that ID.

3.	The second word has lemma 1254 a. This is an indication that BDB
	has more than one entry corresponding to that word. If you enter
	the lemma that way, the app will remove the space, and locate the
	proper entry. If you want to see the difference in BDB for 1254b,
	you can enter that. Some words have as many as five or six entries
	in BDB. With the app in its present form, the only way to know that
	is either to find the words in the text, or to look at AugIndex.xml
	in the [repository](https://github.com/openscriptures/HebrewLexicon).
	There are 540 entries in all that are divided this way.

4.	You can enter any Strong number. The app will automatically add the
	a, if needed. The Strong’s definition will still display correctly.
	You can investigate the distinctions BDB is making by following the
	instructions in #3, above.

To learn more about the lexicon and what everything means, see the
[documentation](https://github.com/openscriptures/HebrewLexicon/blob/master/HebrewLexicon.pdf).

August 27, 2019
