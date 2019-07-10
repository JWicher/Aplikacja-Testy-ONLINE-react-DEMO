
    function enterUruchamiaFunkcję (target, runFunction){
        if(target.charCode === 13){
            runFunction();
        }
    }

    export default {
        enterUruchamiaFunkcję
    }