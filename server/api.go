package main

import (
    "github.com/pkg/errors"
)

type APIDataType struct {
    ZipCodeData ZipCodeDataType
    WeatherData WeatherDataType
}

func api(zcode string) (APIDataType, error) {
    var empty APIDataType
    zcd, err := zipcode(zcode)
    if err != nil {
        return empty, err
    }

    // Just get the weather for the first place
    place := zcd.Places[0]
    wd, err := weather(place.Latitude, place.Longitude)
    if err != nil {
        return empty, errors.WithStack(err)
    }

    return APIDataType{
        ZipCodeData: zcd,
        WeatherData: wd,
    }, nil
}

