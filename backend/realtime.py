import datetime
import json
import numpy as np
import pandas as pd
import pytz
import urllib


current_meteodata = None
current_meteodata_age = None

def get_current_meteodata(name):
    global current_meteodata
    global current_meteodata_age
    if current_meteodata_age is None or datetime.datetime.now().timestamp() - current_meteodata_age > 60:
        response = urllib.request.urlopen("http://www.tsk-praha.cz/tskexport3/json/meteosensors")
        current_meteodata = pd.DataFrame.from_dict(json.loads(response.read().decode())["results"])
        current_meteodata_age = datetime.datetime.now().timestamp()
    results = current_meteodata[current_meteodata.name == name]
    if len(results) == 0:
        return ""
    row = results.iloc[0]
    return "Weather {} in {}: air temperature {:.0f} °C, humidity {:.0f} %, wind speed {:.1f} m/s.".format(
        "{d.day}.{d.month}.{d.year} at {d.hour}:{d.minute:02d}".format(
            d=datetime.datetime.fromtimestamp(row.lastUpdated / 1000, tz=pytz.timezone("Europe/Prague"))),
        row["name"].split("-")[1],
        np.round(row.airTemperature),
        np.round(row.humidity),
        np.round(row.windSpeed, 1),
    )
