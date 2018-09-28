from enum import Enum
from collections import OrderedDict


class FootprintType(Enum):
    total = {'label': "total"}
    carbon = {'label': "carbon"}
    water = {'label': "water"}
    waste = {'label': "waste"}

    def _asdict(self):
        result = OrderedDict()
        result['label'] = self.name
        return result
