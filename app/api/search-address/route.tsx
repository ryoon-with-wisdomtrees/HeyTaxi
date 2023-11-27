import { NextResponse } from "next/server";
//참고: https://docs.mapbox.com/api/search/search-box/#get-suggested-results
const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";
export async function GET(request: any) {
  //The URL interface represents an object providing static methods used for creating object URLs.
  // MDN Reference URL class is a global reference for require('url').URL https://nodejs.org/api/url.html#the-whatwg-url-api
  const { searchParams } = new URL(request.url);

  //https://api.mapbox.com/search/searchbox/v1/suggest?q={search_text}
  const searchText = searchParams.get("q");

  const res = await fetch(
    BASE_URL +
      "?q=" +
      searchText +
      "&language=en&country=kr&limit=6&session_token=0e046701-55c5-4561-88c0-fe8ed190a09f" +
      "&access_token=" +
      process.env.MAPBOX_ACCESS_TOKEN,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const searchResult = await res.json();
  return NextResponse.json(searchResult);
}
