"""
Direct test of plagiarism detector
"""
from plagiarism_detector import PlagiarismDetector

# Initialize detector
detector = PlagiarismDetector(similarity_threshold=50.0, timeout=10)

print("=" * 60)
print("Testing Plagiarism Detector")
print("=" * 60)
print()

# Test 1: Original content
print("Test 1: Original Content (No Web Sources)")
result1 = detector.analyze_documents(
    document_texts=["This is completely original content about sustainable agriculture using vertical farming."],
    web_sources=None
)
print(f"Plagiarism Score: {result1['plagiarismScore']}%")
print(f"Is Plagiarized: {result1['isPlagiarized']}")
print(f"Message: {result1['message']}")
print()

# Test 2: Self-plagiarism
print("Test 2: Self-Plagiarism Detection")
result2 = detector.analyze_documents(
    document_texts=[
        "FinTech solutions are revolutionizing the financial services industry.",
        "Financial technology solutions are revolutionizing the financial services sector."
    ],
    web_sources=None
)
print(f"Plagiarism Score: {result2['plagiarismScore']}%")
print(f"Is Plagiarized: {result2['isPlagiarized']}")
print(f"Message: {result2['message']}")
print(f"Self-Plagiarism Checked: {result2['details']['selfPlagiarismChecked']}")
print()

# Test 3: Web scraping
print("Test 3: Web Scraping (Wikipedia)")
result3 = detector.analyze_documents(
    document_texts=["Artificial intelligence is intelligence demonstrated by machines, in contrast to natural intelligence."],
    web_sources=["https://en.wikipedia.org/wiki/Artificial_intelligence"]
)
print(f"Plagiarism Score: {result3['plagiarismScore']}%")
print(f"Is Plagiarized: {result3['isPlagiarized']}")
print(f"Checked Web Sources: {result3['checkedWebSources']}")
print(f"Matched Sources: {result3['details']['matchedSources']}")
if result3['sources']:
    for source in result3['sources']:
        print(f"  - {source['url']}: {source['similarity']}% (Type: {source['matchType']})")
print()

print("=" * 60)
print("All tests completed!")
print("=" * 60)
