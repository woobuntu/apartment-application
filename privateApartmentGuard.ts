import { isEqual, includes } from "lodash";

interface 민영주택 {
  주택건설지역: string;
  인근지역: string[];
}

interface 민법상성년자 {
  민법상성년여부: "성년자";
  거주지: string;
}

interface 민법상미성년자 {
  민법상성년여부: "미성년자";
  거주지: string;
  세대주여부: boolean;
  // 세대별 주민등록표 등본 등재 기준
  자녀양육여부: boolean;
  직계존속의사망으로형제자매부양: boolean;
  직계존속의실종선고로형제자매부양: boolean;
  직계존속의행방불명으로형제자매부양: boolean;
  기타사유로형제자매부양: boolean;
}

type 청약신청자 = 민법상성년자 | 민법상미성년자;

export default function 민영주택청약자격판별(
  민영주택정보: 민영주택,
  청약신청자정보: 청약신청자
) {
  if (
    isEqual(청약신청자정보.거주지, 민영주택정보.주택건설지역) ||
    includes(민영주택정보.인근지역, 청약신청자정보.거주지)
  ) {
    if (청약신청자정보.민법상성년여부 === "성년자") return true;
    if (
      청약신청자정보.세대주여부 &&
      (청약신청자정보.자녀양육여부 ||
        청약신청자정보.직계존속의사망으로형제자매부양 ||
        청약신청자정보.직계존속의실종선고로형제자매부양 ||
        청약신청자정보.직계존속의행방불명으로형제자매부양 ||
        청약신청자정보.기타사유로형제자매부양)
    ) {
      return true;
    }
    return false;
  }
}
