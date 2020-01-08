const a = 1;
function outer(){
	const a = 2;
	function inner(){
		a++;
    console.log(a);
		const a = 5;
	}
	inner();
}
outer();