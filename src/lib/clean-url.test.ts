import { describe, it, expect } from 'vitest';
import { cleanUrl } from './clean-url';

describe('cleanUrl', () => {
	describe('UTM parameters', () => {
		it('removes basic UTM parameters', () => {
			const url = 'https://example.com/page?utm_source=google&utm_medium=cpc&utm_campaign=spring_sale';
			const expected = 'https://example.com/page';
			expect(cleanUrl(url)).toBe(expected);
		});

		it('removes all UTM parameter variants', () => {
			const url = 'https://example.com/page?utm_id=123&utm_campaign_id=456&utm_source_platform=web';
			const expected = 'https://example.com/page';
			expect(cleanUrl(url)).toBe(expected);
		});

	it('preserves non-tracking parameters when removing UTM', () => {
		const url = 'https://example.com/page?id=123&utm_source=google&color=blue';
		const expected = 'https://example.com/page?id=123&color=blue';
		expect(cleanUrl(url)).toBe(expected);
	});
	});

	describe('Click tracking parameters', () => {
		it('removes Facebook click ID (fbclid)', () => {
			const url = 'https://example.com/page?fbclid=IwAR1234567890';
			const expected = 'https://example.com/page';
			expect(cleanUrl(url)).toBe(expected);
		});

		it('removes Google click ID (gclid)', () => {
			const url = 'https://example.com/page?gclid=Cj0KCQ1234567890';
			const expected = 'https://example.com/page';
			expect(cleanUrl(url)).toBe(expected);
		});

		it('removes Microsoft click ID (msclkid)', () => {
			const url = 'https://example.com/page?msclkid=1234567890abcdef';
			const expected = 'https://example.com/page';
			expect(cleanUrl(url)).toBe(expected);
		});

		it('removes multiple click tracking parameters', () => {
			const url = 'https://example.com/page?gclid=abc&fbclid=def&msclkid=ghi';
			const expected = 'https://example.com/page';
			expect(cleanUrl(url)).toBe(expected);
		});
	});

	describe('Amazon URLs', () => {
		it('cleans Amazon product URL tracking parameters', () => {
			const url = 'https://www.amazon.com/product/dp/B08N5WRWNW?tag=test&keywords=test&qid=1234';
			const expected = 'https://www.amazon.com/product/dp/B08N5WRWNW';
			expect(cleanUrl(url)).toBe(expected);
		});

		it('removes Amazon affiliate tags', () => {
			const url = 'https://www.amazon.com/dp/B08N5WRWNW?tag=affiliate-20&linkCode=asn';
			const expected = 'https://www.amazon.com/dp/B08N5WRWNW';
			expect(cleanUrl(url)).toBe(expected);
		});

		it('cleans Amazon path to essential parts only', () => {
			const url = 'https://www.amazon.com/Some-Product-Name/dp/B08N5WRWNW/ref=sr_1_1?keywords=test';
			const expected = 'https://www.amazon.com/Some-Product-Name/dp/B08N5WRWNW';
			expect(cleanUrl(url)).toBe(expected);
		});

		it('handles Amazon URLs without dp path', () => {
			const url = 'https://www.amazon.com/gp/product/B08N5WRWNW?tag=test';
			const expected = 'https://www.amazon.com/gp/product/B08N5WRWNW';
			expect(cleanUrl(url)).toBe(expected);
		});
	});

	describe('YouTube URLs', () => {
		it('removes YouTube tracking parameters', () => {
			const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be&si=abc123';
			const expected = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
			expect(cleanUrl(url)).toBe(expected);
		});

	it('preserves essential YouTube parameters', () => {
		const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLtest&feature=share';
		const expected = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLtest';
		expect(cleanUrl(url)).toBe(expected);
	});
	});

	describe('Social media tracking', () => {
		it('removes Twitter/X tracking parameters', () => {
			const url = 'https://x.com/user/status/123?s=20&t=abc&ref_src=twsrc';
			const expected = 'https://x.com/user/status/123';
			expect(cleanUrl(url)).toBe(expected);
		});

		it('removes LinkedIn tracking parameters', () => {
			const url = 'https://www.linkedin.com/posts/user_123?trk=public_profile&lipi=urn%3Ali%3Apage';
			const expected = 'https://www.linkedin.com/posts/user_123';
			expect(cleanUrl(url)).toBe(expected);
		});

		it('removes Instagram tracking parameters', () => {
			const url = 'https://www.instagram.com/p/ABC123/?igshid=xyz123';
			const expected = 'https://www.instagram.com/p/ABC123/';
			expect(cleanUrl(url)).toBe(expected);
		});

		it('removes TikTok tracking parameters', () => {
			const url = 'https://www.tiktok.com/@user/video/123?tt_content=abc&tt_source=share';
			const expected = 'https://www.tiktok.com/@user/video/123';
			expect(cleanUrl(url)).toBe(expected);
		});

		it('removes Reddit tracking parameters', () => {
			const url = 'https://www.reddit.com/r/test/comments/abc/?share_id=123&context=3';
			const expected = 'https://www.reddit.com/r/test/comments/abc/';
			expect(cleanUrl(url)).toBe(expected);
		});
	});

	describe('Email marketing parameters', () => {
		it('removes Mailchimp tracking parameters', () => {
			const url = 'https://example.com/page?mc_cid=abc123&mc_eid=def456';
			const expected = 'https://example.com/page';
			expect(cleanUrl(url)).toBe(expected);
		});

		it('removes various email marketing parameters', () => {
			const url = 'https://example.com/page?ml_subscriber=123&ml_subscriber_hash=abc';
			const expected = 'https://example.com/page';
			expect(cleanUrl(url)).toBe(expected);
		});
	});

	describe('E-commerce and search tracking', () => {
		it('removes Algolia search tracking', () => {
			const url = 'https://shop.com/search?query=test&queryID=abc&algoliaSource=nav';
			const expected = 'https://shop.com/search';
			expect(cleanUrl(url)).toBe(expected);
		});

		it('removes general search tracking parameters', () => {
			const url = 'https://shop.com/products?search_query=test&search_id=123&search_source=nav';
			const expected = 'https://shop.com/products';
			expect(cleanUrl(url)).toBe(expected);
		});
	});

	describe('Edge cases', () => {
		it('handles URLs with no parameters', () => {
			const url = 'https://example.com/page';
			expect(cleanUrl(url)).toBe(url);
		});

		it('handles URLs with only clean parameters', () => {
			const url = 'https://example.com/page?id=123&sort=name';
			expect(cleanUrl(url)).toBe(url);
		});

		it('preserves URL hash fragments', () => {
			const url = 'https://example.com/page?utm_source=test#section';
			const expected = 'https://example.com/page#section';
			expect(cleanUrl(url)).toBe(expected);
		});

		it('returns original string for invalid URLs', () => {
			const invalidUrl = 'not a valid url';
			expect(cleanUrl(invalidUrl)).toBe(invalidUrl);
		});

		it('handles empty string', () => {
			const url = '';
			expect(cleanUrl(url)).toBe(url);
		});

		it('handles URLs with special characters in parameters', () => {
			const url = 'https://example.com/page?id=test%20value&utm_source=google';
			const expected = 'https://example.com/page?id=test+value';
			expect(cleanUrl(url)).toBe(expected);
		});
	});

	describe('Complex real-world scenarios', () => {
	it('cleans heavily tracked Amazon product link', () => {
		const url = 'https://www.amazon.com/Sony-Full-frame-Mirrorless-Interchangeable-Lens-ILCE7M3/dp/B07B43WPVK/ref=sr_1_3?crid=2K8RXQVP4KFYJ&keywords=sony+a7iii&qid=1234567890&sprefix=sony+a7iii%2Caps%2C123&sr=8-3&tag=affiliate-20';
		// All Amazon tracking params are removed including keywords, qid, sr, etc. - this is correct behavior
		const expected = 'https://www.amazon.com/Sony-Full-frame-Mirrorless-Interchangeable-Lens-ILCE7M3/dp/B07B43WPVK';
		expect(cleanUrl(url)).toBe(expected);
	});

		it('cleans URL with mixed tracking from multiple sources', () => {
			const url = 'https://example.com/article?utm_source=facebook&utm_medium=social&fbclid=abc123&ref=share&si=xyz';
			const expected = 'https://example.com/article';
			expect(cleanUrl(url)).toBe(expected);
		});

		it('preserves important parameters while removing tracking', () => {
			const url = 'https://shop.com/product?color=blue&size=large&utm_campaign=summer&gclid=abc';
			const expected = 'https://shop.com/product?color=blue&size=large';
			expect(cleanUrl(url)).toBe(expected);
		});
	});
});
