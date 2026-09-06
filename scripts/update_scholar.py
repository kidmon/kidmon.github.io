# Google Scholar 프로필에서 인용 지표를 긁어와 assets/scholar.json을 갱신한다.
# GitHub Actions(.github/workflows/update-scholar.yml)가 매주 실행.
import datetime
import json
import re
import sys
import urllib.request

USER_ID = "gCtUWccAAAAJ"
URL = f"https://scholar.google.com/citations?user={USER_ID}&hl=en"
OUT = "assets/scholar.json"

req = urllib.request.Request(
    URL,
    headers={
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
        )
    },
)
html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8")

# 통계 표 셀 순서: Citations(All, Since), h-index(All, Since), i10-index(All, Since)
nums = re.findall(r'<td class="gsc_rsb_std">(\d+)</td>', html)
if len(nums) < 6:
    sys.exit("Could not parse the citation table (page layout changed or blocked)")

data = {
    "citations": int(nums[0]),
    "hIndex": int(nums[2]),
    "i10Index": int(nums[4]),
    "updated": datetime.date.today().isoformat(),
}

# 수치가 그대로면 파일을 건드리지 않는다 (updated 날짜만 바뀌는 커밋 방지)
try:
    with open(OUT, encoding="utf-8") as f:
        old = json.load(f)
    if all(old.get(k) == data[k] for k in ("citations", "hIndex", "i10Index")):
        print("No change:", old)
        sys.exit(0)
except (OSError, ValueError):
    pass

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)
    f.write("\n")
print("Updated:", data)
