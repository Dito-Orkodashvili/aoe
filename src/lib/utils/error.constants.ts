export const ActionErrorCode = {
  VALIDATION: "VALIDATION",
  UNAUTHORIZED: "UNAUTHORIZED",
  DB_ERROR: "DB_ERROR",
  NOT_FOUND: "NOT_FOUND",
  FORBIDDEN: "FORBIDDEN",
  UNKNOWN: "UNKNOWN",

  STAGE_NOT_FOUND: "STAGE_NOT_FOUND",
  SHOWMATCH_REQUIRES_EVEN_COMPETITORS: "SHOWMATCH_REQUIRES_EVEN_COMPETITORS",
  MATCH_NOT_FOUND: "MATCH_NOT_FOUND",
  MATCH_NOT_IN_PROGRESS: "MATCH_NOT_IN_PROGRESS",
  SCORE_CANNOT_BE_NEGATIVE: "SCORE_CANNOT_BE_NEGATIVE",
  SCORE_EXCEEDS_BEST_OF: "SCORE_EXCEEDS_BEST_OF",
};

export const ERROR_MESSAGES: Record<
  (typeof ActionErrorCode)[keyof typeof ActionErrorCode],
  string
> = {
  VALIDATION: "არასწორი ინფორმაცია.",
  UNAUTHORIZED: "გაიარე ავტორიზაცია.",
  DB_ERROR:
    "გაუთვალისწინებელი შეცდომა. სცადე ხელახლა ან დაუკავშირდი ადმინისტრატორს.",
  NOT_FOUND: "რესურსი არ მოიძებნა.",
  FORBIDDEN: "შენ არ გაქვს ამ ოპერაციის შესრულების უფლება.",
  UNKNOWN: "გაუთვალისწინებელი შეცდომა.",

  SHOWMATCH_REQUIRES_EVEN_COMPETITORS:
    "შოუმატჩისთვის საჭიროა ლუწი რაოდენობის მოთამაშე.",
  STAGE_NOT_FOUND: "ტურნირის ეტაპი არ მოიძებნა.",
  MATCH_NOT_FOUND: "მატჩი არ მოიძებნა.",
  MATCH_NOT_IN_PROGRESS: "მატჩს არ აქვს მიმდინარე სტატუსი.",
  SCORE_CANNOT_BE_NEGATIVE: "ქულა არ უნდა იყოს უარყოფითი.",
  SCORE_EXCEEDS_BEST_OF: "ქულა არ უნდა აჭარბებდეს მაქსიმუმს.",
};
