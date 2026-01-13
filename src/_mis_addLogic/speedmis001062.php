<?php 

function pageLoad() {

    global $ActionFlag;
    global $idx,$database;

    if($ActionFlag!="list") { 
        ?>

<style class="print">

.viewPrint {
	border: 0;
}
.viewPrint > * {
    zoom: 0.92;
}

</style>
<?php
	}
	
}
//end pageLoad

?>