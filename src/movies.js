// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    return moviesArray.map((el) => {
        return el.director;
    });
}

function sortedAllDirectors(moviesArray) {
    let newArr = moviesArray.map((el) => {
        return el.director;
    });

    let unifiedArr = [];
    for (let i = 0; i < newArr.length; i++) {
        if (!unifiedArr.includes(newArr[i])) {
            unifiedArr.push(newArr[i]);
        }
    }

    console.log(unifiedArr);
    return unifiedArr;
}
// sortedAllDirectors(test);

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    let numberOfDramaSS = 0;
    if (moviesArray.length === 0) {
        return 0;
    } else {
        let steveDramaArr = moviesArray
            .filter((el) => {
                return el.director === "Steven Spielberg";
            })
            .filter((el) => {
                return el.genre.includes("Drama");
            });
        numberOfDramaSS = steveDramaArr.length;
    }

    return numberOfDramaSS;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) {
        return 0;
    }
    let sum = moviesArray.reduce((acc, el) => {
        if (el.score) {
            return acc + el.score;
        } else {
            return acc;
        }
    }, 0);
    let avg = Number((sum / moviesArray.length).toFixed(2));

    return avg;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    // for (let i = 0 ; i < moviesArray.length; i++ ) {
    //     if (!moviesArray[i].genre.includes("Drama")) {
    //             return 0;
    //         }
    // }

    let filteredArray = moviesArray.filter((el) => {
        return el.genre.includes("Drama");
    });

    if (filteredArray.length === 0) {
        return 0;
    }

    let sum = filteredArray.reduce((acc, el) => {
        if (el.score) {
            return acc + el.score;
        } else {
            return acc;
        }
    }, 0);

    let avg = Number((sum / filteredArray.length).toFixed(2));

    return avg;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    let sortedArray = JSON.parse(JSON.stringify(moviesArray));

    sortedArray.sort((el1, el2) => {
        if (el1.year < el2.year) {
            return -1;
        } else if (el1.year > el2.year) {
            return 1;
        } else {
            if (el1.title < el2.title) {
                return -1;
            } else {
                return 1;
            }
        }
    });
    return sortedArray;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    let sortedArray = JSON.parse(JSON.stringify(moviesArray));
    sortedArray.sort((el1, el2) => {
        if (el1.title < el2.title) {
            return -1;
        } else if (el1.title > el2.title) {
            return 1;
        } else {
            return 0;
        }
    });

    let newArr = sortedArray.splice(0, 20);
    let finalArr = newArr.map((el) => {
        return el.title;
    });
    return finalArr;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    let newArray = JSON.parse(JSON.stringify(moviesArray));

    // let mappedArray = newArray.map((el) => {
    //     let time = 0;
    //     let numArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    //     for (let i = 0; i < el.duration.length; i++) {

    //         if (numArray.includes(el.duration[i])) {
    //             console.log(el.duration[i])
    //             time += Number(el.duration[i])
    //             console.log(time);
    //         }
    //     }
    //     el.duration = time;
    //     console.log(el);
    //     return el;
    // })
    // console.log(mappedArray)
    // return mappedArray;

    newArray.forEach((el) => {
        let totalMinutes = 0;

        let hour = Number(el.duration[0]);
        totalMinutes = hour * 60;
        if (el.duration.length === 2) {
            el.duration = totalMinutes;
        } else if (!(el.duration[4] === "m")) {
            let minutes = Number(el.duration[3] + el.duration[4]);
            totalMinutes += minutes;
        } else {
            let minutes = Number(el.duration[3]);
            totalMinutes += minutes;
        }
        el.duration = totalMinutes;
    });
    return newArray;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    let bestYear = 0;
    let bestRateAvg = 0;

    if (moviesArray.length === 0) {
        return null;
    }
    if (moviesArray.length === 1) {
        bestYear = moviesArray[0].year;
        bestRateAvg = moviesArray[0].score;
    }

    let sortedByYear = moviesArray.sort((el1, el2) => {
        if (el1.year < el2.year) {
            return -1;
        } else if (el1.year > el2.year) {
            return 1;
        } else {
            return 0;
        }
    });

    let yearsArray = [];
    let scoresArray = [];

    sortedByYear.forEach((el) => {
        if (!yearsArray.includes(el.year)) {
            yearsArray.push(el.year);
        }
    });

    let finalScoresAVG = 0
    moviesArray.forEach((movie) => {
        moviesArray.forEach((el) => {
            if (movie.year === el.year) {
                if (movie.score === bestRateAvg) {
                    bestYear = movie.year;
                }
                if (movie.score > bestRateAvg) {
                    bestRateAvg = movie.score;
                    bestYear = movie.year;
                }
                if (!yearsArray.includes(el.year)) {
                    yearsArray.push(el.year);
                }
                scoresArray.push(el.score)
            }
        });
        finalScoresAVG = scoresArray.reduce((acc, el) => {
            return acc + el;
        }, 0)
    });

    console.log(bestYear);
    console.log(finalScoresAVG/scoresArray.length);

    return `The best year was ${bestYear} with an average score of ${bestRateAvg}`;
}
