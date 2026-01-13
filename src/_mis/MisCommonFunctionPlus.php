<?php

if (!function_exists('my_physical_path')) {
	function my_physical_path($p_path)
	{
		//$new_path = replace($p_path, 'C:/Web/Gware.Net13.45v2/pdsPhoto', '//172.27.128.1/nas06/Data/pds/Photo');
		$new_path = $p_path;
		return $new_path;
	}
}
if (!function_exists('my_url_path')) {
	function my_url_path($p_path)
	{
		//$new_path = replace($p_path, '//172.27.128.1/nas06/Data/pds/Photo/', '/pdsPhoto/');
		$new_path = $p_path;
		return $new_path;
	}
}

?>