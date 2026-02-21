# Crypto-Overview-Data-Analysis
Build a financial dashboard on any financial topic of your choice using publicly available data. The dashboard must be meaningful, visually polished, live, and easy to explain to a non-technical stakeholder.

# Project Overview 
Cryptocurrency Market, It is one of the fastest-moving financial markets in the world, where prices can change dramatically within minutes. Traditional static reports fail to capture this volatility, which makes the crypto overview dashboard not just useful but necessary.

The Crypto Overview Dashboard is built to answer several key questions that any crypto investor or analyst would ask on a daily basis. It tells you which coins are currently gaining or losing value by showing price changes across four different time intervals — 5 minutes, 1 hour, 6 hours, and 24 hours. It also shows you where the trading activity is concentrated by comparing volume across the five major coins. 
Beyond individual prices, the dashboard reveals which coins have the strongest market presence through their liquidity and market cap figures, and it makes the overall market sentiment immediately visible through the green🟢 and red🔴 color coding on every chart.
# Data Source 
I got the data from DEX Screener API. DEX Screener is a real-time data platform for cryptocurrency traders. It tracks token prices, trading volume, and onchain trades across major networks including Ethereum, BSC, Polygon, Avalanche, and others.
The data contains:
| Column | Description |
|---|---|
| **Last Updated** | The exact timestamp when the data was fetched from the API. |
| **Symbol** | The short identifier for the cryptocurrency such as BTC or ETH, used universally across all trading platforms. |
| **Chain** | The blockchain network the cryptocurrency operates on, such as Ethereum, Solana, or Tron. |
| **DEX** | The decentralized exchange where the cryptocurrency is being traded, such as Uniswap, Raydium, or SunSwap. |
| **Price (USD)** | The current market price of the cryptocurrency in US dollars at the time the data was fetched. |
| **Change 5m %** | The percentage price change over the last 5 minutes, reflecting very short-term and rapid market fluctuations. |
| **Change 1h %** | The percentage price change over the last hour, giving a snapshot of the short-term price direction. |
| **Change 6h %** | The percentage price change over the last 6 hours, capturing the mid-term trend throughout part of the day. |
| **Change 24h %** | The percentage price change over the last 24 hours, the most commonly used indicator for measuring a coin's daily performance. |
| **Volume 24h** | The total value of all trades executed for the cryptocurrency in the last 24 hours, reflecting the level of market activity and interest. |
| **Liquidity (USD)** | The total value of assets available in the trading pool; the higher it is, the more stable and accessible the trading becomes. |
| **Market Cap** | The total market value of the cryptocurrency, calculated by multiplying the current price by the total number of coins in circulation. |
| **Trend** | A simple visual indicator showing the coin's direction, either Up if the price change is positive or Down if it is negative. |
| **Link** | A direct URL to the cryptocurrency's page on DexScreener for anyone who wants to explore deeper trading details. |

# Steps & Methodology 
The data was collected in real time using the DexScreener API, which provides live cryptocurrency market data. A Google Apps Script was written to automatically send requests to the API every 5 minutes using a time-based trigger, ensuring the dataset is continuously updated without any manual intervention.

Since DexScreener returns data for multiple trading pairs per coin, the script filters the results and selects only the pair with the highest liquidity for each cryptocurrency. This ensures the price and volume figures represent the most active and reliable market for that coin. The trend is derived by evaluating whether the 24-hour price change is positive or negative.

| Tool | Purpose |
|---|---|
| **DexScreener API** | Source of live cryptocurrency data |
| **Google Apps Script** | Fetches and stores data every 5 minutes |
| **Looker Studio** | Visualizes data in an interactive dashboard |
| **Figma** | Design the dashboard |

The dashboard was designed with a dark theme. Each chart was assigned a specific purpose, the table provides a full data overview, the bar charts enable quick comparison of volume and daily performance, and the line chart reveals how prices behave across different time intervals. Conditional formatting was applied to the Change 24h % column so that positive values appear in green and negative values in red, making the market sentiment immediately readable at a glance.

# Dashboard Screenshots 
<div align="center">
<img src="Screenshots/CRYPTO_OVERVIEW_-_Manar_Khamees (1)_page-0001.jpg" width="900" alt="Crypto Dashboard"/> 
</div>

# Design Screenshots 
<div align="center">
<img src="Screenshots/Crypto Dashboard.png" width="900" alt="Crypto Dashboard Figma"/> 
</div>

# Key Insights 
Bitcoin remains the leader with the highest market cap and liquidity, solidifying its role as the most stable and trusted asset. Ethereum closely follows, making both coins the safest choices for large-volume trades with minimal price impact.

Solana and XRP experience higher volume spikes compared to BTC and ETH, indicating stronger short-term speculative trading. This behavior implies that traders are more active, making these assets riskier but potentially more rewarding in the short term.

Price movements follow a consistent pattern where Bitcoin leads, and other coins react shortly after. This reflects the well-known trend of Bitcoin setting the overall market sentiment, with altcoins trailing its movements.

Coins with lower liquidity are prone to sharp price swings. Stakeholders should view liquidity as a crucial risk factor and avoid placing large orders in these pairs to minimize slippage and unexpected losses.

#### Recommendations
- Monitor the 24-hour price change alongside volume instead of price alone, as price increases with low volume can be misleading.
- For long-term investments, BTC and ETH offer the best stability due to their high liquidity and market cap.
- For short-term trading, consider SOL and XRP for their volatility, which could be beneficial if timed correctly.
- Set alerts for any coin when the 24-hour price change drops below -5% to catch potential downturns early and react accordingly.

# Live Dashboard Link 
<a href="https://lookerstudio.google.com/reporting/34074e39-e693-4467-bffd-1328886e762b" target="_blank">Crypto Overview Dashboard 🚀</a>

# Assumptions & Limitations 
#### Assumptions
The analysis relies on continuous access to Google Apps Script and the DexScreener API. If either goes down, the dashboard will display outdated data until the connection is restored, as the script overwrites the existing data on each fetch cycle.

The data fetching every 5 minutes is assumed to capture meaningful price movements. However, crypto prices can change rapidly, so extreme spikes or crashes may occur and recover between two fetch cycles without being recorded.
#### Limitations
DexScreener only tracks decentralized exchanges, so it misses significant trading volume from major centralized platforms like Binance and Kraken. This can cause discrepancies in the prices and volumes displayed compared to what users see on those platforms.

Because the script overwrites data with each fetch, it doesn’t maintain a historical record, limiting long-term trend analysis or performance comparisons.
