import transformers
import torch

torch.backends.cuda.enable_mem_efficient_sdp(False)
torch.backends.cuda.enable_flash_sdp(False)

model_id = "meta-llama/Meta-Llama-3-8B-Instruct"

pipeline = transformers.pipeline(
    "text-generation",
    model=model_id,
    model_kwargs={"torch_dtype": torch.bfloat16},
    device_map="auto",
)

class LlamaAgent:
    def __init__(self, system_prompt=None, user_prompt=None):
        self.pipeline = pipeline
        self.system_prompt = system_prompt
        self.user_prompt = user_prompt

    def generate(self, system_prompt, user_prompt, max_new_tokens=100):
        system = system_prompt if system_prompt else self.system_prompt
        user = user_prompt if user_prompt else self.user_prompt
        prompt = [{"role": "system", "content": system}, {"role": "user", "content": user}]

        output = self.pipeline(prompt, max_new_tokens=max_new_tokens)
        return output[0]["generated_text"][-1]["content"]