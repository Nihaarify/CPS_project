import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

def initialize_model():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    tokenizer = AutoTokenizer.from_pretrained("mrm8488/bert-tiny-finetuned-sms-spam-detection")
    model = AutoModelForSequenceClassification.from_pretrained("mrm8488/bert-tiny-finetuned-sms-spam-detection").to(device)
    return device, tokenizer, model

def preprocess_text(text, tokenizer, max_seq_len=128):
    encoded = tokenizer.encode_plus(
        text,
        add_special_tokens=True,
        max_length=max_seq_len,
        padding="max_length",
        truncation=True,
        return_attention_mask=True,
        return_tensors='pt'
    )
    return encoded["input_ids"], encoded["attention_mask"]

def classify_text(text, model, tokenizer, device):
    model.eval()
    
    input_ids, attention_mask = preprocess_text(text, tokenizer)
    input_ids = input_ids.to(device)
    attention_mask = attention_mask.to(device)
    
    with torch.no_grad():
        outputs = model(input_ids, attention_mask=attention_mask)
        logits = outputs.logits
        
    predicted_label = torch.argmax(logits, dim=-1).item()
    return "SPAM" if predicted_label == 1 else "NOT SPAM"

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Please provide text to classify")
        sys.exit(1)
        
    text = sys.argv[1]
    device, tokenizer, model = initialize_model()
    result = classify_text(text, model, tokenizer, device)
    print(result)