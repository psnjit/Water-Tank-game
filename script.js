let waterLevel = {
    "one": 0,
    "two": 0,
    "three": 0
}

let fillWater = function(id){
    waterLevel[id]+=20;
    if(waterLevel[id]>100)
    {
        waterLevel[id]=100;
    }
    addWater(id);
    updateLabel(id);
}

let emptyWater = function(id){
    waterLevel[id]=0;
    let tank= document.getElementById(id);
    tank.style.background = "grey";
    updateLabel(id);
}

let redistributeWater = function(){
    if(waterLevel.one=== waterLevel.two && waterLevel.two===waterLevel.three)
        return;
    let flag = "none";
    let meanLevel= (waterLevel.one+waterLevel.two+waterLevel.three)/3;
    if(waterLevel.one>meanLevel && waterLevel.two>meanLevel)
    {
        let waterToRemoveOne=((waterLevel.one-meanLevel)>25)?25:waterLevel.one-meanLevel;
        let waterToRemoveTwo = ((waterLevel.two-meanLevel))>25?25:waterLevel.two-meanLevel;
        waterLevel.three+=(waterToRemoveOne+waterToRemoveTwo);
        waterLevel.one-=waterToRemoveOne;
        waterLevel.two-=waterToRemoveTwo;
        flag="three";

    }
    if(waterLevel.three>meanLevel && waterLevel.two>meanLevel)
    {
        let waterToRemoveThree=((waterLevel.three-meanLevel)>25)?25:waterLevel.three-meanLevel;
        let waterToRemoveTwo = ((waterLevel.two-meanLevel))>25?25:waterLevel.two-meanLevel;
        waterLevel.one+=(waterToRemoveThree+waterToRemoveTwo);
        waterLevel.three-=waterToRemoveThree;
        waterLevel.two-=waterToRemoveTwo;
        flag="one"
    }
    if(waterLevel.one>meanLevel && waterLevel.three>meanLevel)
    {
        let waterToRemoveOne=((waterLevel.one-meanLevel)>25)?25:waterLevel.one-meanLevel;
        let waterToRemoveThree = ((waterLevel.three-meanLevel))>25?25:waterLevel.three-meanLevel;
        waterLevel.two+=(waterToRemoveOne+waterToRemoveThree);
        waterLevel.one-=waterToRemoveOne;
        waterLevel.three-=waterToRemoveThree;
        flag="two"
    }
    if(waterLevel.one>meanLevel && (flag==="one" || flag==="none"))
    {
        let waterToRemove = ((waterLevel.one-meanLevel)>25)?25:waterLevel.one-meanLevel;
        waterLevel.one-=waterToRemove;
        if((waterLevel.two+waterToRemove/2)>meanLevel)
        {
            const temp= waterToRemove-(meanLevel-waterLevel.two);
            waterLevel.two=meanLevel;
            waterLevel.three+=temp;
        }
        else if((waterLevel.three+waterToRemove/2)>meanLevel)
        {
            const temp= waterToRemove-(meanLevel-waterLevel.three);
            waterLevel.three=meanLevel;
            waterLevel.two+=temp;
        }
            else
            {
                waterLevel.three+=waterToRemove/2;
                waterLevel.two+=waterToRemove/2;
            }
    }
    if(waterLevel.two>meanLevel && (flag==="two" || flag==="none"))
    {
        let waterToRemove = ((waterLevel.two-meanLevel))>25?25:waterLevel.two-meanLevel;
        waterLevel.two-=waterToRemove;
        if((waterLevel.one+waterToRemove/2)>meanLevel)
        {
            const temp= waterToRemove-(meanLevel-waterLevel.one);
            waterLevel.one=meanLevel;
            waterLevel.three+=temp;
        }
        else if((waterLevel.three+waterToRemove/2)>meanLevel)
        {
            const temp= waterToRemove-(meanLevel-waterLevel.three);
            waterLevel.three=meanLevel;
            waterLevel.one+=temp;
        }
            else
            {
                waterLevel.one+=(waterToRemove/2);
                waterLevel.three+=(waterToRemove/2);
            }
    }
    if(waterLevel.three>meanLevel && (flag==="three" || flag==="none"))
    {
        let waterToRemove = ((waterLevel.three-meanLevel)>25)?25:waterLevel.three-meanLevel;
        waterLevel.three-=waterToRemove;
        if((waterLevel.two+waterToRemove/2)>meanLevel)
        {
            const temp= waterToRemove-(meanLevel-waterLevel.two);
            waterLevel.two=meanLevel;
            waterLevel.three+=temp;
        }
        else if((waterLevel.one+waterToRemove/2)>meanLevel)
        {
            const temp= waterToRemove-(meanLevel-waterLevel.one);
            waterLevel.one=meanLevel;
            waterLevel.two+=temp;
        }
            else
            {
                waterLevel.one+=(waterToRemove/2);
                waterLevel.two+=(waterToRemove/2);
            }
    }
    addWater("one");
    updateLabel("one");
    addWater("two");
    updateLabel("two");
    addWater("three");
    updateLabel("three");
}

let addWater = function(id) {
    console.log(waterLevel[id]);
    let greyArea= 100-waterLevel[id]
    let tank= document.getElementById(id);
    tank.style.background = `linear-gradient(grey ${greyArea}%, #00FFFF ${waterLevel[id]}%)`;
}

let updateLabel = function(id) {
    let labelElement = document.getElementById(id+"Label");
    labelElement.innerText= waterLevel[id].toFixed(2)+ " ltrs";
}

setInterval(redistributeWater, 3000);

let mouseDownIntervals = [];

let onMouseDown = function(id) {
    mouseDownIntervals.push(setInterval(()=>{console.log("Mouse is down"); fillWater(id)}, 1000));
}

let onMouseUp = function() {
    mouseDownIntervals.map((int)=>{console.log("Mouse is up or out"); clearInterval(int)});
}
