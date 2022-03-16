package main

import (
    "context"
    "time"
    "net/http"
    "io"
    "encoding/json"
    "github.com/pkg/errors"
)

type ZipCodeDataType struct {
    PostCode string `json:"post code"`
    Country string `json:"country"`
    CountryAbbreviation string `json:"country abbreviation"`
    Places []ZipCodeDataPlaceType `json:"places"`
}

type ZipCodeDataPlaceType struct {
    PlaceName string `json:"place name"`
    State string `json:"state"`
    StateAbbreviation string `json:"state abbreviation"`

    Longitude float64 `json:"longitude,string"`
    Latitude float64 `json:"latitude,string"`
}

func api() (ZipCodeDataType, error) {
    const RequestMaxWaitTime = 20 * time.Second

    ctx, cancel := context.WithTimeout(context.Background(), RequestMaxWaitTime)
    defer cancel()

    var empty ZipCodeDataType
    req, err := http.NewRequestWithContext(
        ctx, http.MethodGet, "https://api.zippopotam.us/us/33162", http.NoBody,
    )
    if err != nil {
        return empty, errors.WithStack(err)
    }

    req.Header.Set("User-Agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows 98)")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return empty, errors.WithStack(err)
    }
    defer resp.Body.Close()

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return empty, errors.WithStack(err)
    }

    var zipCodeData ZipCodeDataType
    if err := json.Unmarshal(body, &zipCodeData); err != nil {
        return empty, errors.WithStack(err)
    }

    return zipCodeData, nil
}
