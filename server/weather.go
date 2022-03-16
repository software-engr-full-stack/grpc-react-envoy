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
    Weather string `json:"weather"`
    Wind10mMax float32 `json:"wind10_max"`
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

    return wdata, nil
}

