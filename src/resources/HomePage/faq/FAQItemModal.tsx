import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

interface FAQItem {
  id: string;
  order: number;
  question: string;
  answer: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialItem?: FAQItem | null;
  onSave: (item: FAQItem) => void;
}

export const FAQItemModal: React.FC<Props> = ({
  open,
  onClose,
  initialItem = null,
  onSave,
}) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [order, setOrder] = useState<number>(1);

  useEffect(() => {
    if (initialItem) {
      setQuestion(initialItem.question || "");
      setAnswer(initialItem.answer || "");
      setOrder(Number(initialItem.order) || 1);
    } else {
      setQuestion("");
      setAnswer("");
      setOrder(1);
    }
  }, [initialItem, open]);

  const handleSave = () => {
    const item: FAQItem = initialItem
      ? { ...initialItem, question, answer, order }
      : {
          id: `faq-${Date.now()}`,
          question,
          answer,
          order,
        };
    onSave(item);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialItem ? "Edit FAQ item" : "Create FAQ item"}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            fullWidth
            multiline
            minRows={2}
          />
          <TextField
            label="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            fullWidth
            multiline
            minRows={3}
          />
          <TextField
            label="Order"
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            inputProps={{ min: 0 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!question.trim() || !answer.trim()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FAQItemModal;
