<?php
$xml_file_path=__DIR__.'/../HebrewStrong.xml';
$xsd_file_path=__DIR__.'/../StrongSchema.xml';
$json_file_path=__DIR__.'/json/StrongHebrewDictionary.json';

$xmlstr=file_get_contents($xml_file_path);
$lexicon = new SimpleXMLElement($xmlstr);

$dictionary=[];
$dictionary_mapping=[];

$debug_limit=10;
foreach ($lexicon as $entry) {
	// entry attribute
	$entry_id=(String)$entry['id'];
	// property
	// 1. <w pos="n-m" pron="awb" xlit="ʼâb" xml:lang="heb">אָב</w>
	$w=[
		"pos"=>(String)$entry->w['pos'],
		"pron"=>(String)$entry->w['pron'],
		"xlit"=>(String)$entry->w['xlit'],
		"src"=>(String)$entry->w['src'],
		"w"=>(String)$entry->w,
	];
	// 2. <source>a primitive word;</source>
	$source=$entry->source->asXML();
	// 3. <meaning><def>father</def>, in a literal and immediate, or figurative and remote application</meaning>
	$meaning=$entry->meaning->asXML();
	// 4. <usage>chief, (fore-) father(-less), × patrimony, principal. Compare names in 'Abi-'.</usage>
	$usage=$entry->usage->asXML();
	// 5. optional <note>xlit ʼĂbîyshûwac corrected to ʼĂbîyshûwaʻ</note>
	$note=$entry->note->asXML();

	$dictionary[$entry_id]=[
		"w"=>$w,
		"source"=>makeFalseAsEmptyString($source),
		"meaning"=>makeFalseAsEmptyString($meaning),
		"usage"=>makeFalseAsEmptyString($usage),
		"note"=>makeFalseAsEmptyString($note),
	];
	$dictionary_mapping[$w['w']]=$entry_id;
	// echo $entry_id." Done. ";
	// if($debug_limit--<0)break;
}
echo PHP_EOL;
// print_r($dictionary);
// print_r($dictionary_mapping);

$strong_book = ["dict"=>$dictionary,"mapping"=>$dictionary_mapping];

$text=json_encode($strong_book);
if(file_exists($json_file_path)){
	unlink($json_file_path);
}
$bytes=file_put_contents($json_file_path, $text);
echo "Byte/{$bytes} written to {$json_file_path}!".PHP_EOL;

function makeFalseAsEmptyString($x){
	if(empty($x))$x="";
	return $x;
}