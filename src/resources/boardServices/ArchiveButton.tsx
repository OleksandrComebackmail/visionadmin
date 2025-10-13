import { useState } from "react";
import {
  useDataProvider,
  useNotify,
  useRecordContext,
  useRefresh,
} from "react-admin";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function ArchiveButton() {
  const record = useRecordContext<any>();
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();
  const [open, setOpen] = useState(false);

  if (!record) return null;

  const disabled = record.isActive === false;

  const handleArchive = async () => {
    try {
      await dataProvider.delete("board-services", { id: record.id });
      notify("Service archived successfully", { type: "info" });
      setOpen(false);
      refresh();
    } catch (e: any) {
      notify(e?.body?.message || e?.message || "Failed to archive service", {
        type: "warning",
      });
    }
  };

  return (
    <>
      <Tooltip title={disabled ? "Already archived" : "Archive service"}>
        <span>
          <Button
            size="small"
            variant="text"
            color="error"
            disabled={disabled}
            onClick={() => setOpen(true)}
          >
            Archive
          </Button>
        </span>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Archive service?</DialogTitle>
        <DialogContent>
          This will mark “{record?.name}” as inactive. You can reveal it by
          enabling “Show Archived Services”.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleArchive}>
            Archive
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
