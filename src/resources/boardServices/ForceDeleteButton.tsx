import { useState } from "react";
import {
  useDataProvider,
  useNotify,
  useRecordContext,
  useRedirect,
} from "react-admin";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function ForceDeleteButton() {
  const record = useRecordContext<any>();
  const dataProvider = useDataProvider() as any;
  const notify = useNotify();
  const redirect = useRedirect();
  const [open, setOpen] = useState(false);

  if (!record) return null;

  const handleDelete = async () => {
    try {
      await dataProvider.forceDeleteBoardService(record.id);
      notify("Service permanently deleted", { type: "info" });
      setOpen(false);
      redirect("/board-services");
    } catch (e: any) {
      const msg =
        e?.body?.message ||
        e?.message ||
        "Cannot delete service with existing payments";
      notify(msg, { type: "warning" });
    }
  };

  return (
    <>
      <Tooltip title="Permanently delete plan">
        <span>
          <Button
            color="error"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Delete permanently
          </Button>
        </span>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete this plan permanently?</DialogTitle>
        <DialogContent>
          This action <b>cannot be undone</b>. Allowed only if there are no
          existing payments for this plan.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
