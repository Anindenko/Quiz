
(function () {
    const Result = {
        init() {
            const testResult = JSON.parse(sessionStorage.getItem('testResult'));

            const score = testResult.score;

            const total = testResult.total;

            if (score == null || total == null) {
                location.href = 'index.html';
                return;
            }

            document.getElementById('result-score').innerText = score + '/' + total;
        }
    };
    Result.init();
})();