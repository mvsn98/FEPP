// const searchFeedbacks = (feedbacks, { name })=>{
//     const newFeedbackArr = [];
//     feedbacks.forEach((feedback)=>{
//         if(feedback.name.toLowerCase().includes(name.toLowerCase())){
//             newFeedbackArr.push(feedback);
//         }
//     })
//     return newFeedbackArr
// }

const findCommon = (str1 = '', str2 = '') => {
    const s1 = [...str1];
    const s2 = [...str2];
    const arr = Array(s2.length + 1).fill(null).map(() => {
       return Array(s1.length + 1).fill(null);
    });
    for (let j = 0; j <= s1.length; j += 1) {
       arr[0][j] = 0;
    }
    for (let i = 0; i <= s2.length; i += 1) {
       arr[i][0] = 0;
    }
    let len = 0;
    let col = 0;
    let row = 0;
    for (let i = 1; i <= s2.length; i += 1) {
       for (let j = 1; j <= s1.length; j += 1) {
          if (s1[j - 1] === s2[i - 1]) {
             arr[i][j] = arr[i - 1][j - 1] + 1;
          }
          else {
             arr[i][j] = 0;
          }
          if (arr[i][j] > len) {
             len = arr[i][j];
             col = j;
             row = i;
          }
       }
    }
    if (len === 0) {
       return '';
    }
    let res = '';
    while (arr[row][col] > 0) {
       res = s1[col - 1] + res;
       row -= 1;
       col -= 1;
    }
    return res;
 };

const searchFeedbacks = (feedbacks, { name }) => {
    const newFeedbackArr = [];
    feedbacks.forEach((feedback)=>{
        let res = findCommon(feedback.name.toLowerCase(), name.toLowerCase())
        if(res!==''){
            feedback.score = res.length;
            newFeedbackArr.push(feedback)
        }
    })
    newFeedbackArr.sort((a, b) => (a.score > b.score) ? -1 : 1);
    const resultArr = newFeedbackArr.map((f)=>{
        delete f.score;
        return f;
    })
    return resultArr;
}

export default searchFeedbacks;