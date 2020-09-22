const config = require('./config')
const twit = require('twit')
const T = new twit(config)

function retweet() {
    let params = {
        q: '#meowwolf',
        count: 10
    }
    T.get('search/tweets', params, (err, data, response) => {
        let tweets = data.statuses
        console.log("Ana tweets debug: " + tweets)
        if (!err) {
            for (let dat of tweets) {
                let retweetId = dat.id_str;
                console.log("Ana dat debug: " + dat)
                T.post('statuses/retweet/:id', { id: retweetId }, (err, response) => {
                    if (response)
                        console.log('Retweeted!!! ' + retweetId)
                    if (err)
                        console.log('Something went wrong while RETWEETING... Duplication maybe...')
                })
            }
        } else {
            console.log("Ana err debug: " + err)
            console.log("Ana errors in twitterReply: ")
            for (let error of err.twitterReply.errors) {
                console.log(error)
            }
        }
    })
}
console.log("made it")
setInterval(retweet, 10000)