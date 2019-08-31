const startScreen = () => {
    const startBtn = document.querySelector('.btn_start'),
        startScreen = document.querySelector('.startScreen'),
        questScreen = document.querySelector('.questScreen');

    let tl = anime.timeline({
        easing: 'easeInOutQuad',
        duration: 400
    });

    startBtn.addEventListener('click', () =>{

        tl.add({
            targets: '.startScreen',
            translateY: '-200%',
            opacity: 0
        });
        tl.add({
            targets: '.questScreen',
            opacity: [
                {value: 1, duration: 400}
            ]
        });

        setTimeout(() => {
            startScreen.style.display = 'none';
            questScreen.classList.add('started');

            if( window.innerWidth < 1201 ){
                document.body.style.height = (questScreen.scrollHeight + 10) + 'px';
            } else if( window.innerWidth < 767 ){
                questScreen.style.position = 'relative';

                document.body.style.height = questScreen.scrollHeight + 'px';
            }

        }, 400);

        // startScreen.classList.add('hidden');

    });
};

const toggleSlide = () => {
    const sliderContent = document.querySelector('.slider_content'),
        itemSlide = document.querySelectorAll('.slide_item'),
        btnWrap = document.querySelector('.btnWrap'),
        prevBtn = document.querySelector('.prev'),
        nextBtn = document.querySelector('.next'),
        resultBtn = document.querySelector('.result');

    const sliderStore = [];

    let tl1 = anime.timeline({
        easing: 'easeInOutQuad'
    });


    const questScreen = document.querySelector('.questScreen'),
        resultScreen = document.querySelectorAll('.resultScreen');

    let currentSlide = 0;

    sliderContent.style.transform = `translateX(${(-itemSlide[0].scrollWidth * currentSlide)}px)`;

    btnWrap.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;

        if (!target.matches('.prev, .next, .result')) {
            return;
        }
        if (target.matches('.next') && currentSlide != itemSlide.length - 1) {
            sliderContent.style.transition = `transform 0.4s ease-in-out`;
            currentSlide++;
            sliderContent.style.transform = `translateX(${-itemSlide[0].scrollWidth * currentSlide}px)`;

            target.setAttribute('disabled', '');
        } else if (target.matches('.prev') && currentSlide != 0) {
            sliderContent.style.transition = `transform 0.4s ease-in-out`;
            currentSlide--;
            sliderContent.style.transform = `translateX(${(-itemSlide[0].scrollWidth * currentSlide)}px)`;
        }

        if (currentSlide === itemSlide.length - 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            resultBtn.style.display = 'inline-block';
            resultBtn.setAttribute('disabled', '');
        }

        if (target.matches('.result')) {
            console.log(sliderStore);

            let finalScore =  sliderStore.map((quest) => {
                switch (quest) {
                    case "a":
                        return 1;
                        break;
                    case "b":
                        return 2;
                        break;
                    case "c":
                        return 3;
                        break;
                    case "d":
                        return 4;
                        break;
                    case "e":
                        return 5;
                        break;

                }
                return quest;
            }).reduce((acc, score) => {return acc + score});


            questScreen.classList.remove('started');
            questScreen.style.display = 'block';

            tl1.add({
                targets: '.questScreen',
                translateY: [
                    {value: '-200%', duration: 400}
                ],
                opacity: [
                    {value: 0, duration: 400}
                ]
            });
            tl1.add({
                targets: '.resultScreen',
                opacity: [
                    {value: 1, duration: 300}
                ]
            });
            setTimeout(() => {
                questScreen.style.display = 'none';

                const resStarted = document.querySelector('.resultScreen.started');

                if( window.innerWidth < 1201 ){
                    document.body.style.height = (resStarted.scrollHeight + 10) + 'px';

                } else if( window.innerWidth < 767 ){
                    resStarted.style.position = 'relative';

                    console.log(resultScreen);
                    resultScreen.forEach((item) => {
                        if (!item.classList.contains('started')) {
                            console.log(item);
                            console.log(item.style.opacity);
                            item.style.opacity = '0';
                            console.log(item.style.opacity);
                            console.log(item);
                        }
                    });

                    console.log(resStarted.scrollHeight);
                    console.log(document.body.style.height);
                    document.body.style.height = resStarted.scrollHeight + 'px';
                }
                // resultScreen.classList.add('started');
            }, 400);

            // questScreen.classList.add('hidden');

            switch (true) {
                case finalScore < 9:
                    // location.href = newUrl + "result1/";
                    console.log('страница А');
                    resultScreen[0].classList.add('started');
                    // console.log(location.href);
                    break;
                case finalScore < 15:
                    // location.href = newUrl + "result2/";
                    console.log('страница Б');
                    resultScreen[1].classList.add('started');
                    break;
                case finalScore < 20:
                    // location.href = newUrl + "result3/";
                    console.log('страница В');
                    resultScreen[2].classList.add('started');
                    break;
                case finalScore < 23:
                    // location.href = newUrl + "result4/";
                    console.log('страница Г');
                    resultScreen[3].classList.add('started');
                    break;
                case finalScore >= 23:
                    // location.href = newUrl + "result5/";
                    console.log('страница Д');
                    resultScreen[4].classList.add('started');
                    break;
                default:
                    // location.href = newUrl + "result3/";
                    console.log('страница не найдена');
                    break;
            }

            console.log(finalScore);

        }

    });

    window.addEventListener("resize", toggleSlide);

    const validQuest = () => {
        nextBtn.setAttribute('disabled', '');

        sliderContent.addEventListener('click', (event) => {
            let target = event.target;

            if (!target.matches('.questInput, label')) {
                return;
            }
            if (target.matches('.questInput, label')) {
                nextBtn.removeAttribute('disabled');
                resultBtn.removeAttribute('disabled');

                let inputs = document.querySelectorAll('input');

                inputs.forEach((item) => {
                    if (item === target) {
                        sliderStore.push(item.value);
                    }
                });

            }

        });
    };
    validQuest();

};



const init = () => {
    startScreen();
    toggleSlide();
};

document.addEventListener('DOMContentLoaded', init, false);
