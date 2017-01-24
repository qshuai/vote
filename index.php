<?php
if ($_POST['action'] == 'vote'){
    $program = $_POST['program'];
    $xml = simplexml_load_file('./data/vote.xml');
    $node = $xml->xpath('/vote');
    foreach($node[0] as $key=>$vote){
        if ($key == $program){
            $node[0]->$key = $vote + 1;
            break;
        }
    }
    $newxml = $xml->asXML();
    file_put_contents('./data/vote.xml', $newxml);
    exit();
}


$xml = simplexml_load_file('./data/vote.xml');
$php = $xml->xpath('/vote/PHP')[0];
$python = $xml->xpath('/vote/Python')[0];
$java = $xml->xpath('/vote/Java')[0];
$c = $xml->xpath('/vote/C')[0];
$go = $xml->xpath('/vote/Go')[0];

$total = $php + $python + $java + $c + $go;
$phpRatio = (round($php/$total, 2)*100).'%';
$pythonRatio = (round($python/$total, 2)*100).'%';
$javaRatio = (round($java/$total, 2)*100).'%';
$cRatio = (round($c/$total, 2)*100).'%';
$goRatio = (round($go/$total, 2)*100).'%';

include 'vote.html';