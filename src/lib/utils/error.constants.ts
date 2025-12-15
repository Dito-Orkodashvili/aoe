export const ActionErrorCode = {
  STAGE_NOT_FOUND: "STAGE_NOT_FOUND",
  SHOWMATCH_REQUIRES_EVEN_COMPETITORS: "SHOWMATCH_REQUIRES_EVEN_COMPETITORS",
  VALIDATION: "VALIDATION",
  UNAUTHORIZED: "UNAUTHORIZED",
  DB_ERROR: "DB_ERROR",
  NOT_FOUND: "NOT_FOUND",
  FORBIDDEN: "FORBIDDEN",
  UNKNOWN: "UNKNOWN",
};

export const ERROR_MESSAGES: Record<
  (typeof ActionErrorCode)[keyof typeof ActionErrorCode],
  string
> = {
  SHOWMATCH_REQUIRES_EVEN_COMPETITORS:
    "შოუმატჩისთვის საჭიროა ლუწი რაოდენობის მოთამაშე.",
  STAGE_NOT_FOUND: "ტურნირის ეტაპი არ მოიძებნა",
  VALIDATION: "არასწორი ინფორმაცია.",
  UNAUTHORIZED: "გაიარე ავტორიზაცია.",
  DB_ERROR:
    "გაუთვალისწინებელი შეცდომა. სცადე ხელახლა ან დაუკავშირდი ადმინისტრატორს.",
  NOT_FOUND: "რესურსი არ მოიძებნა.",
  FORBIDDEN: "შენ არ გაქვს ამ ოპერაციის შესრულების უფლება.",
  UNKNOWN: "გაუთვალისწინებელი შეცდომა.",
};
