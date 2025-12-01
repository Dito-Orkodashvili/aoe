import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import {
  TTournamentDetails,
  TDetailsErrors,
} from "@/lib/types/tournament.types";
import { FieldError } from "@/components/ui/field-error";

interface DetailsStepProps {
  details: TTournamentDetails;
  setDetails: Dispatch<SetStateAction<TTournamentDetails>>;
  errors: TDetailsErrors | null;
}

export const DetailsStep = ({
  details,
  setDetails,
  errors,
}: DetailsStepProps) => {
  const handleChange = (
    name: keyof TTournamentDetails,
    value: string | number,
  ) => {
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const getError = (key: keyof TDetailsErrors): string | undefined => {
    const fieldError = errors?.[key] as { _errors: string[] } | undefined;
    return fieldError?._errors?.[0];
  };

  const isShowmatch = details.max_participants === 2;

  return (
    <div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            placeholder="e.g., Summer Championship 2024"
            name="name"
            value={details.name}
            onChange={(event) => handleChange("name", event.target.value)}
            id="name"
          />
          {getError("name") && <FieldError>{getError("name")}</FieldError>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            value={details.description ?? ""}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            id="description"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prize_pool">Prize Pool</Label>
          <Input
            name="prize_pool"
            type="number"
            value={details.prize_pool}
            onChange={(event) =>
              handleChange("prize_pool", Number(event.target.value))
            }
            id="prize_pool"
          />
          {getError("prize_pool") && (
            <FieldError>{getError("prize_pool")}</FieldError>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="max_participants">Max. number of participants</Label>
          <Input
            name="max_participants"
            value={details.max_participants}
            onChange={(event) =>
              handleChange("max_participants", Number(event.target.value))
            }
            id="max_participants"
          />
          {getError("max_participants") && (
            <FieldError>{getError("max_participants")}</FieldError>
          )}
        </div>

        {isShowmatch && (
          <div className="space-y-2">
            <Label htmlFor="best_of">Best Of</Label>
            <Input
              type="number"
              name="best_of"
              value={details.best_of}
              onChange={(event) =>
                handleChange("best_of", Number(event.target.value))
              }
              id="best_of"
            />
            {getError("best_of") && (
              <FieldError>{getError("best_of")}</FieldError>
            )}
          </div>
        )}

        {!isShowmatch && (
          <>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                name="type"
                value={details.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Choose one…" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="single_stage">One Staged</SelectItem>
                  <SelectItem value="two_stage">Two Staged</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                One-staged: Single bracket. Two-staged: Group stage followed by
                playoffs.
              </p>
              {getError("type") && <FieldError>{getError("type")}</FieldError>}
            </div>

            <div className="space-y-2">
              <Label>Format</Label>
              <Select
                name="format"
                value={details.format}
                onValueChange={(value) => handleChange("format", value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Choose one…" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="single_elim">
                    single-elimination
                  </SelectItem>
                  <SelectItem value="swiss">Swiss</SelectItem>
                </SelectContent>
              </Select>
              {getError("format") && (
                <FieldError>{getError("format")}</FieldError>
              )}
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label>Visibility</Label>
          <Select
            name="visibility"
            value={details.visibility}
            onValueChange={(value) => handleChange("visibility", value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Choose one…" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="public">public</SelectItem>
              <SelectItem value="private">private</SelectItem>
              <SelectItem value="unlisted">unlisted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
