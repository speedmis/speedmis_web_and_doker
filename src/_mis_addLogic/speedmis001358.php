    <style>
    body[parentmenutype="22"][menutype="22"] .k-overflow-anchor.k-button {
        display: none;
    }
    body[parentmenutype="22"][menutype="22"] .k-page {
        width: 100%!important;
    }
a#btn_reload, .k-button-group {
    display: none;
}
    </style>

<div id="div_pdf"></div>
    
<script>
	
	function stringToBytes(text) {
	  const length = text.length;
	  const result = new Uint8Array(length);
	  for (let i = 0; i < length; i++) {
		const code = text.charCodeAt(i);
		const byte = code > 255 ? 32 : code;
		result[i] = byte;
	  }
	  return result;
	}

	
	
    var url = 'https://docs.google.com/spreadsheets/d/1G26TfHKNqkz1ndRKkRHOVG0EAKkm0Euneeyp3CZOfEM/edit?embedded=true&rm=demo#gid=0';

    $('div#main')[0].innerHTML = `
        <iframe src="`+url+`" style="width:100%; height: calc(100% - 4px);" frameborder="0" allowfullscreen></iframe>
    `;
	setTimeout( function() {
		$('#btn_menuName').before(`<a role="button" class="k-button" id="btn_2" 
style="background: rgb(136, 255, 136); color: rgb(0, 0, 0);">데이터 적용 후 다운로드</a>`);
		$('#btn_menuName').before(`<a role="button" class="k-button" id="btn_1" 
style="background: rgb(136, 136, 255); color: rgb(255, 255, 255);">데이터 적용 후 링크열기</a>`);

		$('a#btn_1').click( function() {
			exec_url = 'https://script.google.com/macros/s/AKfycbzDDK1sB9tsGefZTi15Y-8LeOPCLR1cw4Xv_0aAFpvOUOWHOX2rDTpEs9RUwMIpV5se/exec';
			result = ajax_url_return(exec_url);
			window.open(JSON.parse(result)['url']);
		});
		$('a#btn_2').click( function() {
			
			exec_url = 'https://script.google.com/macros/s/AKfycbyIgiO50c_wUUkUscC83hgLMsvxeKKK06Wu3lbRU5oMOttiXAv0VFVoUcYUHGArLpF5/exec';
			result = ajax_url_return(exec_url);
			//open_url = "../_mis_addLogic<?php echo $addDir; ?>/<?php echo $RealPid; ?>_treat.php?"+exec_url;
			blob_string = JSON.parse(result)['blob'];

			  var element = document.createElement('a');

			  element.setAttribute('href', 'data:application/pdf;base64,' + blob_string);
			  element.setAttribute('download', 'prova');
			  element.style.display = 'none';
			  document.body.appendChild(element);

			  element.click();

			  document.body.removeChild(element);
		});
		
	});

</script>
