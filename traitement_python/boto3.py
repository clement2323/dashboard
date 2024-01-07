import boto3
s3 = boto3.client("s3",endpoint_url = 'https://'+'minio.lab.sspcloud.fr',
                  aws_access_key_id= 'L0FTNT42QZGERTTEC9QD', 
                  aws_secret_access_key= '4cgco1H0z9zafUewr3Jwr6M428ymAAlxv8B2XbKw', 
                  aws_session_token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJMMEZUTlQ0MlFaR0VSVFRFQzlRRCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sImF1ZCI6WyJtaW5pby1kYXRhbm9kZSIsIm9ueXhpYSIsImFjY291bnQiXSwiYXV0aF90aW1lIjoxNzA0MjA5NDkwLCJhenAiOiJvbnl4aWEiLCJlbWFpbCI6ImNsZW1lbnQuZ3VpbGxvQGluc2VlLmZyIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImV4cCI6MTcwNDI5NTg5NCwiZmFtaWx5X25hbWUiOiJHdWlsbG8iLCJnaXZlbl9uYW1lIjoiQ2zDqW1lbnQiLCJncm91cHMiOlsiY2hhbGxlbmdlZGF0YS1lbnMiLCJzbHVtcy1kZXRlY3Rpb24iXSwiaWF0IjoxNzA0MjA5NDk0LCJpc3MiOiJodHRwczovL2F1dGgubGFiLnNzcGNsb3VkLmZyL2F1dGgvcmVhbG1zL3NzcGNsb3VkIiwianRpIjoiNDgyY2E3Y2MtNWI3Ny00MGI0LTkxZjctZjY3NjUwYzUzYjFlIiwibG9jYWxlIjoiZW4iLCJuYW1lIjoiQ2zDqW1lbnQgR3VpbGxvIiwicG9saWN5Ijoic3Rzb25seSIsInByZWZlcnJlZF91c2VybmFtZSI6ImNndWlsbG8iLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZ3JvdXBzIGVtYWlsIiwic2Vzc2lvbl9zdGF0ZSI6ImM0YjYyNGQyLWM4MjMtNDk1Zi05MWJlLWI5YmYwY2E4NWQ3ZCIsInNpZCI6ImM0YjYyNGQyLWM4MjMtNDk1Zi05MWJlLWI5YmYwY2E4NWQ3ZCIsInN1YiI6IjNiMDZlZmE0LTU5ZmUtNDNjOC1hMDJiLWE5NGQ5YjRiNTQ0ZSIsInR5cCI6IkJlYXJlciJ9.Imcy1PHBwWlKbfK26p1MjXQpRIpcKbVjiFgSUjlz2Kwwp8CrpSZWfhqPc4JorbJZv7mqmUxVP-EpPDf1jzdvQA')



def list_files(bucket):
    files = []
    response = s3.list_objects_v2(Bucket=bucket)
    for obj in response['Contents']:
        files.append(obj['Key'])
    return files

files = list_files('cguillo')
for file in files:
    print(file)