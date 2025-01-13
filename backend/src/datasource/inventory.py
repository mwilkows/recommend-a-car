import pathlib
from collections import UserDict
from typing import Any

import pandas as pd

from datasource import INVENTORY


class Inventory(list[dict[str, Any]]):
    @classmethod
    def fetch(cls, data_source: str) -> 'Inventory':
        assert pathlib.Path(data_source).exists(), f"Can't find data source {data_source}"
        inventory_file = pd.read_csv(data_source, skipinitialspace=True)
        inventory = inventory_file.to_dict(orient='records')
        return Inventory(inventory)
