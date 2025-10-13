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

export default function UnarchiveButton() {
  const record = useRecordContext<any>();
  const dataProvider = useDataProvider() as any;
  const notify = useNotify();
  const refresh = useRefresh();
  const [open, setOpen] = useState(false);

  if (!record) return null;

  const disabled = record.isActive === true;

  const handleUnarchive = async () => {
    try {
      await dataProvider.unarchiveBoardService(record.id);
      notify("Service unarchived successfully", { type: "info" });
      setOpen(false);
      refresh();
    } catch (e: any) {
      notify(e?.body?.message || e?.message || "Failed to unarchive service", {
        type: "warning",
      });
    }
  };

  return (
    <>
      <Tooltip title={disabled ? "Already active" : "Unarchive service"}>
        <span>
          <Button
            size="small"
            variant="text"
            color="success"
            disabled={disabled}
            onClick={() => setOpen(true)}
          >
            Unarchive
          </Button>
        </span>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Unarchive service?</DialogTitle>
        <DialogContent>
          This will make “{record?.name}” active again and visible to users.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="success" onClick={handleUnarchive}>
            Unarchive
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
