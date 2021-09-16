# Assessments
Coding assessments for new hires

## Book Integrations Assessment

### Overview

Create a `Bot` object whose purpose is to read betting data, parse into an appripriate format and send to a server. Your Bot is required to have 3 methods

1) `readBets` - This methods reads a file containing betslip data in sportsbook formatting
2) `parseBets` - This method takes a list of betslip data in sportsbook formatting and converts in to a list of dictionaries in SharpSports formatting
3) `sendBets` - This methods takes a list of SharpSports bet dictionaries and sends it to a given url

You may use any additional function/class methods that you see fit.

Finally write an `index.js` file that uses all three methods to complete the parsing task and send the formatted data to the server.

### Data

Provided is a list of book reference numbers (`betId` in the sportsbook betslip data) and a brief description of each corresponding betslip. The raw data for these betslips is provided in the `betslips.txt`. You can also see how the sportsbook displays each betslip to the user by looking at the images in `betslip_images`. 

All of the betslips have a risk amount of $1, except for bet `FILL THIS IN` which has a risk of $5.55. All of the betslips are pending, you do not need to be concerned with the status, outcome or profit for any betslip.

**Totals (Straight)**
- `16289866`: Colorado Rockies @ Atlanta Braves - Full Game Total
- `16290017`: New York Giants @ Washington Football Team - Full Game Total
- `16290128`: New York Giants @ Washington Football Team - First Half Total

**Spreads (Straight)**
- `16290095`: New York Giants @ Washington Football Team - First Half Spread
- Run Lines - both sides of an MLB bet
- Point Spreads - both sides of an NFL bet

**Moneylines (Straight)**
- `16290489`: 3-leg moneyline parlay (New York Yankees @ Baltimore Orioles, St. Louis Cardinals @ New York Mets,Colorado Rockies @ Atlanta Braves)

**Player Totals (Prop)**
- `16290304`: Jose Urquidy Player Strikeouts Total
- `16290192`: Taylor Heinicke Player Passing Yards Total
- `16290219`: Terry McLauren Player Recieveing Yards Total

**Unhandled Bets**
- `16290418`: Kansas City Cheifs Superbowl Future
- First touchdown scorer prop
- Some other weird prop

### Parsing

A betslip contains accounting information of a wager and may contain several bets/legs that make up the wager as a whole. Bet and leg can be used interchangably; the sportsbook calls it a leg and SharpSports calls it a bet. From here on out we will only refer to betslips and associated bets. 

The goal of the `parseBets` function is to take the raw data provided and translate each bet of each betslip in the list to a dictionary with the following values:


**BetSlip Attibutes**

- `bookRef`: The book's unique identifier for the betslip

- `slipType`: Either `single` or `parlay` depending on if the betslip contains a single bet or multiple bets

- `slipOddsAmerican`: The odds of the betslip as a whole (same as `betOddsAmerican` if the betslip is a single)

- `atRisk`: The amount of money (in cents) put up by the bettor for a given betslip

- `toWin`: The max amount of money (in cents) that will be paid out to the bettor for this betslip

- `betType`: Either `straight` or `prop`. The only prop bets should be the Player Total Bets

**Bet Attibutes**

- `eventName`: A string descriptor of the event, formatted as `Away Team @ Home Team`

- `proposition`: For these bets - one of `spread`, `moneyline` or `total`

- `position`: The side of a wager the bettor is taking against the book. In the case of a `total`, the position would be `over` or `under`, while in the case of a `spread` or `moneyline` the position would be a team.

- `segment`: This represents the specific half, quarter, or other specific segment of the event that the bet is based on. This is null if the bet is on the whole game.

- `line`: The line set by the sportsbook for this particular bet. In the case of a `total` or `spread` this will contain a float, otherwise it will be null.

- `betOddsAmerican`: The odds of the individual bet

- `player`: If the bet is a player prop, then this should contain the player assiociated with the bet. Otherwise this field is null

- `metric`: If the bet is a player prop, then this should contain the metric (e.g. rebounds, recieving yards) associated with the bet. Otherwise this field is null

- `incomplete`: Should be `False` if the bet is fully handled and parsed by our parsing engine, and `True` otherwise. If the bet is incomplete then all the bet attributes besides this should be `null` and the the betSlip attributes should be filled in. 

You are only tasked with building a parsing engine for straight bets (spreads, moneylines and totals) as well as player total prop bets. These types of bets should be fully parsed with `incomplete = False`. All other types of bets should have `incomplete = True` and should have null values for all bet attributes.

The data you are given has X betslips, all singles except for one 3-leg parlay, so the result of the parsing should be X+2 bet dictionaries. The betslip information in each dictionary will be repeated if there are multiple bets/legs associated with the slip (in this case just the parlay).

You can refer to the SharpSports documentation to get more information about these `BetSlip` and `Bet` attributes. However the documentation is considerably slimmed down for this assessment and the assessment in considered self-contained. 

### Sendind Data to Server

Fill this in, we want to write a small receiver that we can send data to using localhost

### Grading Criteria 

- Accuracy: The little stuff matters, small mistakes in a parsed bet create bugs that are hard to track down

- Organization and Readability: Our bet parsing engine is continously changing as we add new sports, bet types and attributes. It is essential that our code is easily accessible, logically organized, and well commented. 

- Generalizability: We have only provided a small sample of bets. Not only should your code fully parse the given straight bets and player props, but it should also be built to parse other simliar bets. We are constantly dealing with new bet types and formats that we have never seen before. Try to write code that will label bets that are not straight bets or player props as incomplete; we dont want to put bad data in the bet attributes if the bet is not currently handled. We will test your code on a larger sample of test bets and see how it performs.

- Error Handling: Sometimes we receive bad data from the sportsbook. You dont want the parser to break if it is provided with bad data. Also use proper error handling for any API calls.