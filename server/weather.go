package main

import (
    "context"
    "time"
    "net/http"
    "io"
    "encoding/json"
    "fmt"
    "github.com/pkg/errors"
)

type WeatherDataType struct {
    Product string `json:"product"`
    Init uint `json:"init,string"`
    DataSeries []DataSeriesType `json:"dataseries"`
}

type DataSeriesType struct {
    Date float64 `json:"date"`
    Temp2m Temp2mType `json:"temp2m"`
    Wind10mMax float32 `json:"wind10_max"`

    Weather string `json:"weather"`
    WeatherName string `json:"weather_name"`
    WeatherDesc string `json:"weather_desc"`
}

type Temp2mType struct {
    Max float32 `json:"max"`
    Min float32 `json:"min"`
}

func weather(latitude, longitude float64) (WeatherDataType, error) {
    const RequestMaxWaitTime = 20 * time.Second

    ctx, cancel := context.WithTimeout(context.Background(), RequestMaxWaitTime)
    defer cancel()

    var empty WeatherDataType
    req, err := http.NewRequestWithContext(
        ctx, http.MethodGet,
        fmt.Sprintf(
            "https://www.7timer.info/bin/civillight.php?lon=%f&lat=%f&ac=0&unit=metric&output=json&tzshift=0",
            longitude,
            latitude,
        ),
        http.NoBody,
    )
    if err != nil {
        return empty, errors.WithStack(err)
    }

    req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko)")

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

    var wdata WeatherDataType
    if err := json.Unmarshal(body, &wdata); err != nil {
        return empty, errors.WithStack(err)
    }

    weatherTable := map[string]map[string]string{
        "clear": map[string]string{"desc": "Total cloud cover less than 20%%", "name": "Clear"},
        "pcloudy": map[string]string{"desc": "Total cloud cover between 20%%-60%%", "name": "Partly cloudy"},
        "mcloudy": map[string]string{"desc": "Total cloud cover between 20%%-80%%", "name": "Mostly cloudy"},
        "cloudy": map[string]string{"desc": "Total cloud cover over over 80%%", "name": "Cloudy"},
        "lightrain": map[string]string{
            "desc": "Precipitation rate less than 4mm/hr with total cloud cover more than 80%%",
            "name": "Light rain",
        },
        "rain": map[string]string{"desc": "Rain with total cloud cover over 80%%", "name": "Rain"},
        "lightsnow": map[string]string{"desc": "Precipitation rate less than 4mm/hr", "name": "Light snow"},
        "snow": map[string]string{"desc": "Snow with total cloud cover over 80%%", "name": "Snow"},
        "ts": map[string]string{"desc": "Lifted Index less than -5", "name": "Thunderstorm"},
        "tsrain": map[string]string{"desc": "Lifted Index less than -5 with rain", "name": "Thunderstorm with rain"},
        "ishower": map[string]string{"desc": "Precipitation rate less than 4mm/hr with total cloud cover less than 60%%", "name": "Shower"},
    }

    for ix, ds := range wdata.DataSeries {
        value, ok := weatherTable[ds.Weather]
        if ok {
            wdata.DataSeries[ix].WeatherName = value["name"]
            wdata.DataSeries[ix].WeatherDesc = value["desc"]
            continue
        }

        wdata.DataSeries[ix].WeatherName = fmt.Sprintf("Unsupported weather code %#v", ds.Weather)
        wdata.DataSeries[ix].WeatherDesc = wdata.DataSeries[ix].WeatherName
    }

    return wdata, nil
}

