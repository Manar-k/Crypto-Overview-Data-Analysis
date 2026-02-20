function main() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var coinsSheet = getOrCreateSheet(ss, "Coin Prices");
  fetchDexScreener(coinsSheet);
}

function getOrCreateSheet(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function fetchDexScreener(sheet) {
  try {
    // Top 5 crypto
    var coins = ["BTC", "ETH", "BNB", "SOL", "XRP"];
    var timestamp = new Date().toLocaleString();

    sheet.clearContents();
    sheet.appendRow([
      "Last Updated", "Symbol", "Chain", "DEX",
      "Price (USD)", "Change 5m %", "Change 1h %",
      "Change 6h %", "Change 24h %",
      "Volume 24h", "Liquidity (USD)",
      "Market Cap", "Trend", "Link"
    ]);

    coins.forEach(function(coin) {
      try {
        var url = "https://api.dexscreener.com/latest/dex/search?q=" + coin;
        var response = UrlFetchApp.fetch(url);
        var pairs = JSON.parse(response.getContentText()).pairs;

        if (!pairs || pairs.length === 0) {
          Logger.log("No data for: " + coin);
          return;
        }

        // Take best pair liquidity
        var best = pairs.sort(function(a, b) {
          return (b.liquidity ? b.liquidity.usd : 0) - (a.liquidity ? a.liquidity.usd : 0);
        })[0];

        var change24h = best.priceChange ? (best.priceChange.h24 || 0) : 0;
        var trend = change24h >= 0 ? "🟢 Up" : "🔴 Down";

        sheet.appendRow([
          timestamp,
          best.baseToken.symbol,
          best.chainId,
          best.dexId,
          best.priceUsd ? parseFloat(best.priceUsd) : "N/A",
          best.priceChange ? (best.priceChange.m5 || 0) : 0,
          best.priceChange ? (best.priceChange.h1 || 0) : 0,
          best.priceChange ? (best.priceChange.h6 || 0) : 0,
          change24h,
          best.volume ? best.volume.h24 : 0,
          best.liquidity ? best.liquidity.usd : 0,
          best.marketCap || "N/A",
          trend,
          best.url
        ]);

        Utilities.sleep(500);

      } catch(coinErr) {
        Logger.log("Error: " + coin + ": " + coinErr);
      }
    });

    Logger.log("DexScreener data updated");
  } catch(e) {
    Logger.log("DexScreener error: " + e);
  }
}